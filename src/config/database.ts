/**
 * MongoDB database connection configuration
 * Manages the connection to MongoDB using the official driver
 */

import { MongoClient, ServerApiVersion, Db } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI || "";

if (!uri) {
  throw new Error("MONGODB_URI is not defined in environment variables");
}

/**
 * Create a MongoClient with a MongoClientOptions object to set the Stable API version
 */
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let isConnected = false;

/**
 * Connects to MongoDB database
 * @returns Promise<void>
 */
export async function connectToDatabase(): Promise<void> {
  try {
    if (isConnected) {
      console.log("📦 Already connected to MongoDB");
      return;
    }

    // Connect the client to the server
    await client.connect();

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });

    isConnected = true;
    console.log("✅ Successfully connected to MongoDB!");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
}

/**
 * Closes the MongoDB connection
 * @returns Promise<void>
 */
export async function closeDatabaseConnection(): Promise<void> {
  try {
    await client.close();
    isConnected = false;
    console.log("✅ MongoDB connection closed");
  } catch (error) {
    console.error("❌ Error closing MongoDB connection:", error);
    throw error;
  }
}

/**
 * Gets the MongoDB database instance
 * @param dbName - Name of the database (optional, uses default from URI if not provided)
 * @returns Db instance
 */
export function getDatabase(dbName?: string): Db {
  if (!isConnected) {
    throw new Error("Database not connected. Call connectToDatabase() first.");
  }
  return dbName ? client.db(dbName) : client.db();
}

/**
 * Gets the MongoClient instance
 * @returns MongoClient instance
 */
export function getClient(): MongoClient {
  return client;
}
