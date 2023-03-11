const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dtkilt0vk",
  api_key: "919196826195549",
  api_secret: "_NOsll-V4UrjEM4bFD5ME-T8tPE",
});

module.exports = cloudinary.uploader;
