import { Multer } from "multer";

declare global {
  namespace Express {
    interface Request {
      files?: Multer.File[]; // Custom property for multer file uploads
    }
  }
}
