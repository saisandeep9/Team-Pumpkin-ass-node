const express = require("express");
const app = express();
const _ = require("lodash");
const multer = require("multer");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const upload = require("../middleware/image");
const { Image, validate } = require("../models/image");

app.get("/images", async (req, res) => {
  const image = await Image.find().populate("category categoryName");
  res.send(image);
});

app.post("/images", [auth, admin], upload.single("img"), async (req, res) => {
  console.log(req.file.path);

  let image = await new Image(
    _.pick(req.body, ["imageName", "contributor", "category"])
  );
  image.img = await req.file.path;
  await image.save();
  console.log(image);
  res.send(image);
});

module.exports = app;
