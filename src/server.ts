/**
 * Main server entry point
 * Starts the HTTP server and manages the application lifecycle
 */

import createApp from "./app";
import { config } from "./config";

/**
 * Starts the server
 */
const startServer = (): void => {
  try {
    // Create Express application
    const app = createApp();

    // Start server on configured port
    const server = app.listen(config.port, () => {
      console.log("=================================");
      console.log(`🚀 ${config.appName}`);
      console.log(`📡 Server running on port ${config.port}`);
      console.log(`🌍 Environment: ${config.nodeEnv}`);
      console.log(`📋 API Version: ${config.apiVersion}`);
      console.log(`🔗 URL: http://localhost:${config.port}`);
      console.log(
        `📊 Status: http://localhost:${config.port}/api/${config.apiVersion}/status`
      );
      console.log("=================================");
    });

    /**
     * Handling termination signals
     * Allows clean server shutdown
     */
    const gracefulShutdown = (signal: string): void => {
      console.log(`\n${signal} received. Shutting down server...`);

      server.close(() => {
        console.log("✅ Server closed successfully");
        process.exit(0);
      });

      // Force shutdown after 10 seconds if not closed normally
      setTimeout(() => {
        console.error("⚠️  Forcing server shutdown");
        process.exit(1);
      }, 10000);
    };

    // Listen for termination signals
    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));

    /**
     * Handling uncaught errors
     * Prevents server from crashing due to unexpected errors
     */
    process.on("unhandledRejection", (reason: any, promise: Promise<any>) => {
      console.error("❌ Unhandled Rejection at:", promise, "reason:", reason);
    });

    process.on("uncaughtException", (error: Error) => {
      console.error("❌ Uncaught Exception:", error);
      gracefulShutdown("UNCAUGHT_EXCEPTION");
    });
  } catch (error) {
    console.error("❌ Error starting server:", error);
    process.exit(1);
  }
};

// Start the server
startServer();
