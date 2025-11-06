/**
 * Centralized error handling middleware
 * Captures all application errors and returns a consistent response
 */

import { Request, Response, NextFunction } from "express";
import { AppError } from "../types";

/**
 * Custom class for application errors
 * Allows creating errors with specific HTTP status codes
 */
export class CustomError extends Error implements AppError {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // Indicates it's an expected and manageable error

    // Maintains correct stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error handling middleware
 * IMPORTANT: Must have exactly 4 parameters for Express to recognize it
 * as an error middleware
 */
export const errorHandler = (
  err: Error | CustomError,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  // Determine status code (500 by default if not a CustomError)
  const statusCode = (err as CustomError).statusCode || 500;

  // Determine if the error is operational
  const isOperational = (err as CustomError).isOperational || false;

  // Error log for debugging
  console.error("Error:", {
    message: err.message,
    statusCode,
    isOperational,
    stack: err.stack,
    timestamp: new Date().toISOString(),
    path: req.path,
    method: req.method,
  });

  // Response to client
  res.status(statusCode).json({
    success: false,
    error: err.message,
    // Only include stack trace in development
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

/**
 * Middleware to handle not found routes (404)
 */
export const notFoundHandler = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const error = new CustomError(`Route not found: ${req.originalUrl}`, 404);
  next(error);
};
