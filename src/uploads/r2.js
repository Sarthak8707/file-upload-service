import { PutObjectCommand } from "@aws-sdk/client-s3";
import { r2 } from "./r2.js";

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;

    const key = `${Date.now()}-${file.originalname}`;

    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await r2.send(command);

    const fileUrl = `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${process.env.R2_BUCKET_NAME}/${key}`;

    res.json({
      message: "Uploaded to R2 successfully",
      url: fileUrl,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed" });
  }
});
