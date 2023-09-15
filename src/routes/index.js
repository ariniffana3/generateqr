const express = require("express");

const Router = express.Router();
const qrCode = require("./qrcode");

Router.get("/qrcode/", qrCode.generateQrCode);
Router.get("/qrcode/:id", qrCode.checkQrCode);

module.exports = Router;
