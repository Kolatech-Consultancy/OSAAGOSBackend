import Media from "../models/media.model.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRETKEY,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

export default class MediaController {
    static async uploadMedia(req, res) {
        upload.single('file')(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ error: "Error uploading the file." });
            }

            const { title, description } = req.body;
            const file = req.file;

            if (!file) {
                return res.status(400).json({ error: "No file uploaded." });
            }

            try {
                // Upload file to Cloudinary
                const result = cloudinary.uploader.upload_stream({
                    resource_type: "auto",
                    public_id: `${Date.now()}_${file.originalname}`,
                    folder: "osaagos-media"
                }, async (error, result) => {
                    if (error) {
                        return res.status(500).json({ error: "Error uploading to Cloudinary." });
                    }
                    const media = new Media({
                        title,
                        description,
                        mediaType: file.mimetype,
                        URL: result.secure_url
                    });

                    await media.save();
                    return res.status(201).json({ message: "Media upload successful." });
                });

                // Write the file buffer to Cloudinary
                result.end(file.buffer);
            } catch (error) {
                console.log(error);
                return res.status(500).json({ error: "Error saving media to database." });
            }
        });
    }

    static async getMedia(req, res) {
        try {
            const all_media = await Media.find()
            res.status(200).json({ data: all_media })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal server error." })
        }
    }



    static async getMediaById(req, res) {
        try {
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                return res.status(400).json({ message: "Invalid media ID." });
            }
            const media = await Media.findById({ "_id": req.params.id })
            if (media == null) {
                return res.status(404).json({ error: "Media not found." })
            }
            res.status(200).json({ data: media })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal server error." })
        }
    }



    static async updateMedia(req, res) {
        const { title, description } = req.body
        try {
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                return res.status(400).json({ message: "Invalid media ID." });
            }
            let media = await Media.findById({ "_id": req.params.id })
            if (media == null) {
                return res.status(404).json({ error: "Media not found." })
            }
            media = await Media.updateOne({ "_id": req.params.id },{
                title: title,
                description: description
            })
            res.status(200).json({ message: "Media updated successfully."})
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal server error." })
        }
    }



    static async deleteSingleMedia(req, res) {
        try {
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                return res.status(400).json({ message: "Invalid media ID." });
            }
            let media = await Media.findById({ "_id": req.params.id })
            if (media == null) {
                return res.status(404).json({ error: "Media not found." })
            }
            media = await Media.deleteOne({ "_id": req.params.id })
            res.status(200).json({ message: "Media deleted successfully."})
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal server error." })
        }
    }



    static async deleteAllMedia(req, res) {
        try {
            let media = await Media.deleteMany()
            res.status(200).json({ message: `Deleted ${media.deletedCount} documents.`})
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal server error." })
        }
    }
}
