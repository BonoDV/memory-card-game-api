/**
 * Controller for server status endpoint
 * Contains business logic to verify API status
 */

import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../types";

/**
 * Interface for status endpoint response
 */
interface StatusData {
  status: string;
  timestamp: string;
  uptime: number;
  environment: string;
  version: string;
}

/**
 * Controller to check server status
 *
 * @route GET /api/status
 * @returns {ApiResponse<StatusData>} Information about server status
 */
export const getStatus = (
  _req: Request,
  res: Response<ApiResponse<StatusData>>,
  next: NextFunction
): void => {
  try {
    // Prepare response data
    const statusData: StatusData = {
      status: "online",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(), // Time the server has been running (in seconds)
      environment: process.env.NODE_ENV || "development",
      version: process.env.API_VERSION || "v1",
    };

    // Send successful response
    res.status(200).json({
      success: true,
      data: statusData,
      message: "API working correctly",
    });
  } catch (error) {
    // Pass error to error handling middleware
    next(error);
  }
};

/**
 * Controller for simple health check
 * Useful for monitoring systems that only need to verify the server responds
 *
 * @route GET /api/health
 * @returns {ApiResponse} Simple response indicating server is active
 */
export const getHealth = (
  _req: Request,
  res: Response<ApiResponse>,
  next: NextFunction
): void => {
  try {
    res.status(200).json({
      success: true,
      message: "OK",
    });
  } catch (error) {
    next(error);
  }
};
