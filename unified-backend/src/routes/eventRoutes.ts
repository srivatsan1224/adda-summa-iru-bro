import { Router, Request, Response, NextFunction } from "express";
import { getContainer } from "../utils/dbClient";

const router = Router();
const containerName = "Events"; // Azure Cosmos DB container

// Middleware to handle async errors
const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

// 📌 Get all events
router.get(
  "/",
  asyncHandler(async (_req: Request, res: Response) => {
    const container = await getContainer(containerName);
    const querySpec = { query: "SELECT * FROM c" };
    const { resources: events } = await container.items.query(querySpec).fetchAll();
    res.status(200).json(events);
  })
);

// 📌 Get event by ID
router.get(
  "/:eventId",
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { eventId } = req.params;
    if (!eventId) {
      res.status(400).json({ message: "Event ID is required!" });
      return;
    }

    const container = await getContainer(containerName);
    const querySpec = {
      query: "SELECT * FROM c WHERE c.id = @eventId",
      parameters: [{ name: "@eventId", value: eventId }],
    };

    const { resources } = await container.items.query(querySpec).fetchAll();

    if (!resources || resources.length === 0) {
      res.status(404).json({ message: "Event not found" });
      return;
    }

    res.status(200).json(resources[0]);
  })
);

// 📌 Create an event
router.post(
  "/createEvent",
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const eventData = req.body;

    if (!eventData || !eventData.title || !eventData.date) {
      res.status(400).json({ message: "Title and date are required fields!" });
      return;
    }

    const container = await getContainer(containerName);
    const eventId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newEvent = { id: eventId, ...eventData };

    const { resource } = await container.items.create(newEvent);

    res.status(201).json({
      message: "Event created successfully",
      event: resource,
    });
  })
);

// 📌 Update an event
router.put(
  "/:eventId",
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { eventId } = req.params;
    const updateData = req.body;

    if (!eventId) {
      res.status(400).json({ message: "Event ID is required!" });
      return;
    }

    const container = await getContainer(containerName);
    const { resource: existingEvent } = await container.item(eventId, eventId).read();

    if (!existingEvent) {
      res.status(404).json({ message: "Event not found" });
      return;
    }

    const updatedEvent = { ...existingEvent, ...updateData };

    const { resource } = await container.item(eventId, eventId).replace(updatedEvent);

    res.status(200).json({
      message: "Event updated successfully",
      event: resource,
    });
  })
);

// 📌 Delete an event
router.delete(
  "/:eventId",
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { eventId } = req.params;

    if (!eventId) {
      res.status(400).json({ message: "Event ID is required!" });
      return;
    }

    const container = await getContainer(containerName);
    await container.item(eventId, eventId).delete();

    res.status(200).json({ message: "Event deleted successfully" });
  })
);

export default router;

