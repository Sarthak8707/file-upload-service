import express from "express";
import cors from "cors";
import {fileURLToPath} from "url";
import path from "path";
import multer from "multer";

const app = express();

app.use(cors())
app.get("/", (req, res) => {
    res.json({Message: "Hello"})
})
app.use(express.json());

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);



// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, path.join(__dirname, "uploads/"));
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + "-" + file.originalname)
//     }
// })

// const upload = multer({ storage });

// // file processing must be done as a middleware 

// app.post("/upload", upload.single("file"), (req, res) => {
    
//     // file handled as middleware
//     // express doesn't deal with files as it only deals with json

//     res.json({message: "file uploaded", file: req.file});
//     console.log("Image just got uploaded successfully!");


// })


















// upload.single("file"),

app.post("/upload",  (req, res) => {
    console.log("Image uploaded")
})




app.listen(3000, () => {
    console.log("Server started");
})