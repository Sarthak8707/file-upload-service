import { Worker } from "bullmq";
import IORedis from "ioredis";
import cloudinary from "./cloudinary.js";
import multer from "multer";
import fs from "fs";

const connection = new IORedis({
  host: "127.0.0.1",
  port: 6379,
  maxRetriesPerRequest: null,
});





const worker = new Worker(
  "uploadQueue",
  async (job) => {

    const { fileName, filePath } = job.data;


    try{
        const result = await cloudinary.uploader.upload(filePath, {
            folder: "uploads",
            public_id: fileName
        })

        fs.unlinkSync(filePath);

    }
    catch(err){
        console.err(err);
        
        // throw err manually so that bullmq retries

        throw err;
    }

  },
  { connection }
);

worker.on("completed", (job, result) => {
  console.log("Uploaded:", result.secure_url);
});

worker.on("failed", (job, err) => {
    
  console.error("Upload failed:", err);
  const {filePath} = job.data;

  if(fs.existsSync(filePath)){
    fs.unlinkSynb(filePath);
  }

});


