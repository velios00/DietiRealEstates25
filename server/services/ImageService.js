import cloudinary from "../utils/cloudinary.js";

export class ImageService {
  static async uploadImage(file) {
    if (!file) {
      throw new Error("No file provided for upload.");
    }

    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "real-states",
            resource_type: "image",
          },
          (error, result) => {
            if (error) {
              return reject(error);
            }
            resolve(result.secure_url);
          }
        )
        .end(file.buffer);
    });
  }
}
