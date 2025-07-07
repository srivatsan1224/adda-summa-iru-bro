import { Router, Request, Response } from "express";
import { getContainer } from "../db";

const router = Router();

// Get all products
router.get("/", async (req: Request, res: Response) => {
  try {
    const container = await getContainer("Products");
    const querySpec = {
      query: "SELECT * FROM c",
    };
    const { resources: products } = await container.items.query(querySpec).fetchAll();
    res.status(200).json(products);
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Error fetching products:", err.message);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
});

// Search and filter products
router.get("/search", async (req: Request, res: Response) => {
  const { search, category, isFree, isExclusive, discount, minPrice, maxPrice, rating } = req.query;

  const querySpec = {
    query: `
      SELECT * FROM c 
      WHERE 
        (@search = '' OR CONTAINS(LOWER(c.name), LOWER(@search))) AND
        (@category = '' OR c.category = @category) AND
        (@isFree = false OR c.isFree = @isFree) AND
        (@isExclusive = false OR c.isExclusive = @isExclusive) AND
        (@discount = 0 OR c.discount >= @discount) AND
        (@minPrice = 0 OR c.price >= @minPrice) AND
        (@maxPrice = 0 OR c.price <= @maxPrice) AND
        (@rating = 0 OR c.rating >= @rating)
    `,
    parameters: [
      { name: "@search", value: search ? String(search) : "" },
      { name: "@category", value: category ? String(category) : "" },
      { name: "@isFree", value: isFree === "true" },
      { name: "@isExclusive", value: isExclusive === "true" },
      { name: "@discount", value: discount ? parseInt(discount as string, 10) : 0 },
      { name: "@minPrice", value: minPrice ? parseInt(minPrice as string, 10) : 0 },
      { name: "@maxPrice", value: maxPrice ? parseInt(maxPrice as string, 10) : 0 },
      { name: "@rating", value: rating ? parseFloat(rating as string) : 0 },
    ],
  };

  try {
    const container = await getContainer("Products");
    const { resources: products } = await container.items.query(querySpec).fetchAll();
    res.status(200).json(products);
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Error searching products:", err.message);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
});

export default router;
