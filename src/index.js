import express from "express";
import cors from "cors";
import {fileURLToPath} from "url";
import path from "path";
import multer from "multer";
import dotenv from "dotenv";
import cloudinary from "./cloudinary.js";
import { uploadQueue } from "./queue.js";


const app = express();
dotenv.config();
app.use(cors())
app.use(express.json());




const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "src/uploads/");
    }
}, {
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + file.originalname;
        cb(null, uniqueName);
    }
})



const upload = multer({storage});


app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const job = await uploadQueue.add("uploadJob", {
      filePath: req.file.path,
      fileName: req.file.originalname,
    }, {
        attempts: 2,
        backoff: {
            type: "exponential",
            delay: 10000
        },
        removeOnComplete: true,
        removeOnFail: false
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