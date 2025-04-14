const cloudinary = require("cloudinary").v2;
require('dotenv').config();

console.log("Cloud name is:", process.env.CLOUD_NAME);
console.log("API key is:", process.env.CLOUDINARY_API_KEY);
console.log("API secret is:", process.env.CLOUDINARY_API_SECRET);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;