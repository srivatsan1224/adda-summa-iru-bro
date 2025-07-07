import { Request, Response, NextFunction } from "express";

// Custom Error Class
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Object.setPrototypeOf(this, AppError.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

// Centralized Error Handling Middleware to be used in app.ts
export const globalErrorHandler = (
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction // Express requires `next` for error middleware
): void => {
  console.error("ERROR 💥:", err.stack || err);

  let statusCode = 500;
  let message = "An internal server error occurred.";

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    if (!err.isOperational && process.env.NODE_ENV === "production") {
      message = "Something went very wrong!";
    }
  } else {
    // For non-AppError types
    if (process.env.NODE_ENV === "development") {
      message = err.message || message;
    }
  }

  res.status(statusCode).json({
    status: statusCode >= 500 ? "error" : "fail",
    message: message,
  });
};

// Async Error Handler Wrapper for Express Routes
export const catchAsync = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

// Specific Error Types
export class NotFoundError extends AppError {
  constructor(message: string = "Resource not found") {
    super(message, 404);
  }
}

export class BadRequestError extends AppError {
  constructor(message: string = "Bad request") {
    super(message, 400);
  }
}