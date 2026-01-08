import { ImageService } from "../services/ImageService.js";

export class ImageController {
  static async uploadImage(req, res, next) {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No image file provided." });
      }
      const imageUrl = await ImageService.uploadImage(req.file);
      res.status(201).json({
        url: imageUrl,
      });
    } catch (err) {
      next(err);
    }
  }
}
