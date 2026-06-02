import mongoose from "mongoose";

const globalForMongoose = globalThis;
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME;

if (!globalForMongoose.mongooseCache) {
  globalForMongoose.mongooseCache = {
    conn: null,
    promise: null
  };
}

export async function connectToDatabase() {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not configured. Add it to your environment before starting the app.");
  }

  if (globalForMongoose.mongooseCache.conn) {
    return globalForMongoose.mongooseCache.conn;
  }

  if (!globalForMongoose.mongooseCache.promise) {
    globalForMongoose.mongooseCache.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
        dbName: MONGODB_DB_NAME,
        maxPoolSize: 10
      })
      .then((mongooseInstance) => mongooseInstance);
  }

  try {
    globalForMongoose.mongooseCache.conn = await globalForMongoose.mongooseCache.promise;
  } catch (error) {
    globalForMongoose.mongooseCache.promise = null;
    throw error;
  }

  return globalForMongoose.mongooseCache.conn;
}
