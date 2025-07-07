import { Router } from "express";
import { getAllCategories } from "../controllers/categoryController";
// import { addItemValidators, handleValidationErrors } from "../utils/validators"; // If addCategoryItem was used

const router = Router();

// If addCategoryItem is removed or managed by itemRoutes:
// router.post(
//     "/",
//     addItemValidators,
//     handleValidationErrors,
//     addCategoryItem // This might be removed
// );

router.get(
    "/",
    getAllCategories
);

export default router;