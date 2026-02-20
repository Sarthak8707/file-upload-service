import express from "express";
import cors from "cors";
import {fileURLToPath} from "url";
import path from "path";
import multer from "multer";
import dotenv from "dotenv";
import cloudinary from "./cloudinary.js";

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
    });

    res.json({
      message: "File added to queue",
      jobId: job.id,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.listen(3000, () => {
    console.log("Server started");
})