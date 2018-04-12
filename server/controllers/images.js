const router = require("express").Router();
const mongoose = require("mongoose");
const fs = require("fs");
const del = require("del");
const Image = require("../schemas/image");

export default {
  setRouting: function(router) {
    router.post("/api/image", this.postImage);
    router.post("/api/image/:type", this.serveImage);
    router.get("/api/images", this.getImages);
  },
  postImage: function(req, res) {
    if(req.file === undefined || req.file === null) { return res.status(400).send({ error: "Please upload an image file" }) }
    // read image and save as a base 64
    fs.readFile(req.file.path, (err, data) => {
      const base64Image = data.toString("base64");
      const newImage = new Image({
        name: req.body.adName,
        clickThrough: req.body.clickThrough,
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
  },
  getImages: function(req, res) {
    Image.find({}).then(response => {
      return res.status(200).send({ images: response });
    }).catch(error => {
      res.status(400).send({ error: error.message });
    });
  },
  serveImage: function(req, res) {
    Image.findOne({ adType: req.params.type }).then((doc) => {
      return res.send({ image: doc });
    }).catch(error => {
      res.status(400).send({ error: error.message });
    });
  }
}
