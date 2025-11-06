/**
 * Routes for server status related endpoints
 * Defines routes and connects them with their respective controllers
 */

import { Router } from "express";
import { getStatus, getHealth } from "../controllers/status.controller";

// Create Express router instance
const router = Router();

/**
 * @route   GET /api/status
 * @desc    Get detailed information about server status
 * @access  Public
 */
router.get("/status", getStatus);

/**
 * @route   GET /api/health
 * @desc    Simple health check for monitoring
 * @access  Public
 */
router.get("/health", getHealth);

export default router;
