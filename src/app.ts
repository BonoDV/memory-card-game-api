/**
 * Main Express application configuration
 * Defines global middlewares and route configuration
 */

import express, { Application } from "express";
import { config } from "./config";
import routes from "./routes";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler";

/**
 * Creates and configures the Express application
 * @returns {Application} Configured Express application instance
 */
const createApp = (): Application => {
  // Create Express instance
  const app: Application = express();

  /**
   * Global middlewares
   * Executed in order for each request
   */

  // JSON parser - allows reading req.body in JSON format
  app.use(express.json());

  // URL-encoded parser - allows reading form data
  app.use(express.urlencoded({ extended: true }));

  /**
   * Simple logging middleware
   */
  app.use((req, _res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
  });

  /**
   * Application routes
   * All routes are prefixed with /api/{version}
   */
  app.use(`/api/${config.apiVersion}`, routes);

  /**
   * Root route for quick verification
   */
  app.get("/", (_req, res) => {
    res.json({
      success: true,
      message: `Welcome to ${config.appName}`,
      version: config.apiVersion,
      documentation: `/api/${config.apiVersion}/status`,
    });
  });

  /**
   * Error handling middlewares
   * IMPORTANT: These must go at the end, after all routes
   */

  // Handling not found routes (404)
  app.use(notFoundHandler);

  // Centralized error handling
  app.use(errorHandler);

  return app;
};

export default createApp;
