const { v4: uuidv4 } = require("uuid");
const qr = require("qrcode");
const cloudinary = require("../config/cloudinary");
const helperWrapper = require("../helper/wrapper");
const { connect } = require("../config/db");

module.exports = {
  generateQrCode: async (request, response) => {
    try {
      const db = await connect();
      const koleksi = db.collection("data");
      const id = uuidv4();
      const newData = { id: id };
      await koleksi.insertOne(newData);
      const options = {
        folder: "generateQr",
      };
      var qrCode = "";
      await qr.toDataURL(`${id}`, async (err, qrDataURL) => {
        cloudinary.uploader.upload(qrDataURL, options, (error, result) => {
          if (error) {
            console.log("Error uploading to Cloudinary:", error);
          } else {
            qrCode = result.url;
          }
          return helperWrapper.response(response, 201, "success", {
            image: qrCode,
          });
        });
        if (err) throw err;
      });
    } catch (error) {
      console.log(error);
      return helperWrapper.response(
        response,
        500,
        "Internal Server Error",
        null
      );
    }
  },
  checkQrCode: async (request, response) => {
    try {
      const { id } = request.params;
      console.log(id, "params");
      const db = await connect();
      const koleksi = db.collection("data");
      const checkQr = await koleksi.find({ id: id }).toArray();
      console.log(checkQr, "checkQr");
      if (checkQr.length <= 0) {
        return helperWrapper.response(response, 422, "QrCode was gone", null);
      }
      setTimeout(() => {
        const result = koleksi.deleteOne({ id: id });
      }, 30000);
      return helperWrapper.response(response, 201, "Success");
    } catch (error) {
      console.log(error);
      return helperWrapper.response(
        response,
        500,
        "Internal Server Error",
        null
      );
    }
  },
};
