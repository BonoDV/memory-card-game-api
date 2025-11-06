/**
 * Custom types and interfaces for the application
 * Extends Express types to add custom properties
 */

import { Request, Response } from "express";

/**
 * Interface for standardized API responses
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

/**
 * Interface for custom application errors
 */
export interface AppError extends Error {
  statusCode: number;
  isOperational: boolean;
}

/**
 * Express Request and Response types with improved typing
 */
export type TypedRequest<T = any> = Request<any, any, T>;
export type TypedResponse<T = any> = Response<ApiResponse<T>>;
