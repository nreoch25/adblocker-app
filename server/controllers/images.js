const router = require("express").Router();
const mongoose = require("mongoose");
const fs = require("fs");
const del = require("del");
const Image = require("../schemas/image");

export default {
  setRouting: function(router) {
    router.post("/api/image", this.postImage);
  },
  postImage(req, res) {
    if(req.file === undefined || req.file === null) { return res.status(400).send({ error: "Please upload an image file" }) }
    // read image and save as a base 64
    fs.readFile(req.file.path, (err, data) => {
      const base64Image = data.toString("base64");
      const newImage = new Image({
        name: req.body.adName,
        contentType: req.file.mimetype,
        size: req.file.size,
        img: Buffer(base64Image, "base64"),
        adType: req.body.adType
      });
      // delete all images in the upload directory
      const folderPath = `${process.cwd()}/uploads`;
      del.sync([`${folderPath}/**`, `!${folderPath}`]);
      // save new image to the database
      newImage.save().then(() => {
        res.status(200).send("Thanks for uploading an image");
      }).catch(error => {
        res.status(400).send({ error: error.message });
      });
    });
  }
}
