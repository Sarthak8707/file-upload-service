import express from "express";
import cors from "cors";
import {fileURLToPath} from "url";
import path from "path";
import multer from "multer";
import { configDotenv } from "dotenv";
import cloudinary from "./cloudinary.js";

const app = express();
configDotenv();
app.use(cors())
app.get("/", (req, res) => {
    res.json({Message: "Hello"})
})
app.use(express.json());




const upload = multer({storage: multer.memoryStorage()});


app.post("/upload", upload.single("file"), async (req, res) => {
    
    const result = cloudinary.uploader.upload_stream({folder: "uploads"}, (error, result) => {
        
        if(error){
            return res.json({msg: "An error occurred"});
        }
        res.json({msg: "Uploaded successfully"});       

    });

    result.end(req.file.buffer);

})




app.listen(3000, () => {
    console.log("Server started");
})