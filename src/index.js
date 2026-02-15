import express from "express";
import cors from "cors";
import {fileURLToPath} from "url";
import path from "path";
import multer from "multer";

const app = express();

app.use(cors())
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "src/uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    }
})

const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req, res) => {
    res.json({message: "file uploaded", file: req.file});
    console.log("Image just got uploaded successfully!");
})


app.listen(3000, () => {
    console.log("Server started");
})