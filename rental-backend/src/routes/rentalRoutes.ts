import * as express from "express";
import { addRentalItem } from "../controllers/rentalController";
import { createItemValidators, handleValidationErrors } from "../utils/validators";

const router = express.Router();

router.post(
    "/",
    createItemValidators,
    handleValidationErrors,
    addRentalItem
);

export default router;