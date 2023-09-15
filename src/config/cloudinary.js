const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  //   cloud_name: `${process.env.CLOUDINARY_CLOUDNAME}`,
  //   api_key: `${process.env.CLOUDINARY_APIKEY}`,
  //   api_secret: `${process.env.CLOUDINARY_APISECRET}`,
  cloud_name: `dabzupph0`,
  api_key: `836113171438188`,
  api_secret: `E8moUWTv6Ga6SYqpYZ4WHcsH9hk`,
});

module.exports = cloudinary;
