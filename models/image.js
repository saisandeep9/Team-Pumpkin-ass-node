const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new mongoose.Schema({
  imageName: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 50,
    trim: true,
  },
  contributor: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  image: { type: String },
});
const Image = mongoose.model("Image", imageSchema);

function validateImage(image) {
  const schema = {
    imageName: Joi.string().min(5).max(50).required(),
    contributor: Joi.string().min(5).max(255).required(),
    category: Joi.objectId().required(),
    image: Joi.string(),
  };

  return Joi.validate(image, schema);
}

exports.Image = Image;
exports.validate = validateImage;
