import express from "express";
import cors from "cors";
import {fileURLToPath} from "url";
import path from "path";
import multer from "multer";
import dotenv from "dotenv";
import cloudinary from "./cloudinary.js";
import { uploadQueue } from "./queue.js";
import "./worker.js"; // start worker

const app = express();
dotenv.config();
app.use(cors())
app.use(express.json());




const upload = multer({storage: multer.memoryStorage()});


app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const job = await uploadQueue.add("uploadJob", {
      fileBuffer: req.file.buffer,
      fileName: req.file.originalname,
    }, {
        attempts: 2, // retry 2 times
        backoff: {
          type: "exponential",
          delay: 3000,
        },
        removeOnComplete: true,
        removeOnFail: false,
      });

    res.json({
      message: "File added to queue",
      jobId: job.id,
    });
    console.log("done!!")
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.listen(3000, () => {
    console.log("Server started");
})