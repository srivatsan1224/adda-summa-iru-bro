import express, { Request, Response, Router } from "express";
import multer from "multer";
import dotenv from "dotenv";
import {
  BlobServiceClient,
  BlobSASPermissions,
  SASProtocol,
  ContainerClient,
} from "@azure/storage-blob";
import {
  getHousingPropertyContainer,
  createContainerIfNotExists,
  createPropertyListing,
  getUserProperties,
  updatePropertyListing,
  deletePropertyListing,
} from "../db";

dotenv.config();

const router: Router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Environment variables
const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING || "";
const CONTAINER_NAME = "property-photos";

if (!AZURE_STORAGE_CONNECTION_STRING) {
  throw new Error("Azure Storage connection string is required.");
}

// Initialize BlobServiceClient
const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

// Helper function to generate SAS token
const generateSasToken = async (containerClient: ContainerClient, blobName: string): Promise<string> => {
  const startsOn = new Date();
  const expiresOn = new Date(startsOn);
  expiresOn.setMinutes(startsOn.getMinutes() + 60); // Valid for 60 minutes

  return containerClient.getBlobClient(blobName).generateSasUrl({
    permissions: BlobSASPermissions.parse("r"),
    startsOn,
    expiresOn,
    protocol: SASProtocol.Https,
  });
};

// Upload photos endpoint
router.post("/upload-photos", upload.array("photos"), async (req: Request, res: Response) => {
  try {
    if (!req.files || !Array.isArray(req.files)) {
      res.status(400).json({ message: "No files uploaded" });
      return;
    }

    const containerClient = blobServiceClient.getContainerClient(CONTAINER_NAME);
    await containerClient.createIfNotExists();

    const uploadResults = await Promise.all(
      (req.files as Express.Multer.File[]).map(async (file) => {
        const blobName = `${Date.now()}-${file.originalname}`;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        await blockBlobClient.uploadData(file.buffer, {
          blobHTTPHeaders: { blobContentType: file.mimetype },
        });

        const sasToken = await generateSasToken(containerClient, blobName);
        return {
          originalName: file.originalname,
          blobUrl: `${blockBlobClient.url}?${sasToken}`,
        };
      })
    );

    const { email, propertyId } = req.body;
    if (!email || !propertyId) {
      res.status(400).json({ message: "Email and propertyId are required to associate photos" });
      return;
    }

    const housingPropertyContainer = await getHousingPropertyContainer();
    const { resource: existingProperty } = await housingPropertyContainer
      .item(propertyId, email)
      .read();

    if (!existingProperty) {
      res.status(404).json({ message: "Property not found" });
      return;
    }

    const updatedProperty = {
      ...existingProperty,
      gallery: {
        ...(existingProperty.gallery || {}),
        photos: [...(existingProperty.gallery?.photos || []), ...uploadResults.map((r) => r.blobUrl)],
      },
    };

    const { resource: updatedResource } = await housingPropertyContainer
      .item(propertyId, email)
      .replace(updatedProperty);

    res.status(200).json({
      message: "Photos uploaded and added to property successfully",
      uploads: uploadResults,
      updatedProperty: updatedResource,
    });
  } catch (error: any) {
    console.error("Error uploading photos:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// Submit property form
router.post("/submit-form", async (req: Request, res: Response) => {
  try {
    const formData = req.body;
    if (!formData || !formData.email) {
      res.status(400).json({ message: "Form data with a valid email is required!" });
      return;
    }

    const email = formData.email;
    const housingPropertyContainer = await getHousingPropertyContainer();
    const documentId = `${email}-${Date.now()}`;
    const newDocument = { id: documentId, email, ...formData };

    const { resource } = await housingPropertyContainer.items.create(newDocument);
    const property = await createPropertyListing(email, formData);

    res.status(201).json({
      message: "Form data and property listing stored successfully",
      data: { formData: resource, property },
    });
  } catch (error: any) {
    console.error("Error processing form submission:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// Fetch all properties without filtering by email
router.get("/properties", async (req: Request, res: Response) => {
  try {
    const housingPropertyContainer = await getHousingPropertyContainer();
    const querySpec = {
      query: "SELECT * FROM c"
    };

    const { resources } = await housingPropertyContainer.items.query(querySpec).fetchAll();

    if (!resources || resources.length === 0) {
      res.status(404).json({ message: "No properties found." });
      return;
    }

    res.status(200).json({ properties: resources });
  } catch (error: any) {
    console.error("Error retrieving properties:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// Update property
router.put("/property/:propertyId", async (req: Request, res: Response) => {
  try {
    const { propertyId } = req.params;
    const { email, ...updateData } = req.body;

    if (!email) {
      res.status(400).json({ message: "Email is required!" });
      return;
    }

    const updatedProperty = await updatePropertyListing(propertyId, email, updateData);
    res.status(200).json({
      message: "Property updated successfully",
      property: updatedProperty,
    });
  } catch (error: any) {
    console.error("Error updating property:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});
router.get("/property/:propertyId", async (req: Request, res: Response) => {
  try {
    const { propertyId } = req.params;

    if (!propertyId) {
      res.status(400).json({ message: "Property ID is required!" });
      return;
    }

    const housingPropertyContainer = await getHousingPropertyContainer();
    const querySpec = {
      query: "SELECT * FROM c WHERE c.id = @propertyId",
      parameters: [{ name: "@propertyId", value: propertyId }],
    };

    const { resources } = await housingPropertyContainer.items.query(querySpec).fetchAll();

    if (!resources || resources.length === 0) {
      res.status(404).json({ message: "Property not found" });
      return;
    }

    res.status(200).json(resources[0]);
  } catch (error: any) {
    console.error("Error fetching property by ID:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// Delete property
router.delete("/property/:propertyId", async (req: Request, res: Response) => {
  try {
    const { propertyId } = req.params;
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ message: "Email is required!" });
      return;
    }

    await deletePropertyListing(propertyId, email);
    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting property:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// Generic CREATE API
router.post("/create", async (req: Request, res: Response) => {
  try {
    const { containerName, data } = req.body;
    if (!containerName || !data) {
      res.status(400).json({ message: "Container name and data are required!" });
      return;
    }

    const container = await createContainerIfNotExists(containerName);
    const documents = Array.isArray(data) ? data : [data];
    const results = await Promise.all(
      documents.map(async (doc) => {
        const processedDoc = {
          id: doc.id || `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          ...doc,
        };
        const { resource } = await container.items.create(processedDoc);
        return resource;
      })
    );

    res.status(201).json({
      message: "Items created successfully",
      items: results,
    });
  } catch (error: any) {
    console.error("Error creating item:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

export default router;
