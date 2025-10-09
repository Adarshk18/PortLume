const cloudinaryLib = require('cloudinary').v2;
const { Readable } = require('stream');

cloudinaryLib.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

const uploadBuffer = (buffer, folder = '') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinaryLib.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    const stream = Readable.from(buffer);
    stream.pipe(uploadStream);
  });
};

module.exports = { uploadBuffer };
