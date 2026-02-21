import { Worker } from "bullmq";
import IORedis from "ioredis";
import cloudinary from "./cloudinary.js";

const connection = new IORedis({
  host: "127.0.0.1",
  port: 6379,
  maxRetriesPerRequest: null,
});

const worker = new Worker(
  "uploadQueue",
  async (job) => {

    const { fileBuffer, fileName } = job.data;

    const buffer = Buffer.from(fileBuffer.data);

    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "uploads", public_id: fileName },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      stream.end(buffer);
    });
  },
  { connection }
);

worker.on("completed", (job, result) => {
  console.log("Uploaded:", result.secure_url);
});

worker.on("failed", (job, err) => {
  console.error("Upload failed:", err);
});