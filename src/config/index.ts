/**
 * Centralized configuration of environment variables
 * Loads and validates necessary environment variables for the application
 */

import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

/**
 * Interface for application configuration
 */
interface Config {
  port: number;
  nodeEnv: string;
  appName: string;
  apiVersion: string;
}

/**
 * Gets an environment variable or returns a default value
 */
const getEnvVar = (key: string, defaultValue: string): string => {
  return process.env[key] || defaultValue;
};

/**
 * Exported application configuration
 */
export const config: Config = {
  port: parseInt(getEnvVar("PORT", "3000"), 10),
  nodeEnv: getEnvVar("NODE_ENV", "development"),
  appName: getEnvVar("APP_NAME", "Memory Card Game API"),
  apiVersion: getEnvVar("API_VERSION", "v1"),
};
