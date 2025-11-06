/**
 * Central routes file of the application
 * Groups and organizes all API routes
 */

import { Router } from "express";
import statusRoutes from "./status.routes";

// Create main router
const router = Router();

/**
 * Base API routes
 * All routes are prefixed with /api in app.ts
 */

// Status and health check routes
router.use("/", statusRoutes);

export default router;
