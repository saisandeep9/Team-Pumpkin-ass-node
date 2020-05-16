const express = require("express");
const app = express();
const _ = require("lodash");

const { Category } = require("../models/category");

app.get("/categories", async (req, res) => {
  const category = await Category.find();
  res.send(category);
});

app.post("/categories", async (req, res) => {
  let category = await Category.findOne({
    categoryName: req.body.categoryName,
  });
  if (category) return res.status(400).send("category already registered.");

  category = new Category(_.pick(req.body, ["categoryName"]));

  await category.save();
  res.send(category);
});
module.exports = app;
