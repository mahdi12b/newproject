const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const CoursSchema = new Schema(
  {
    professor_id: {
      type: Schema.Types.ObjectId,
      ref: "professor",
    },
    title: {
      type: String,
      required: true,
      maxlength: 50,
    },
    description: {
      type: String,
      required: true,
    },
    privacy: {
      type: Number,
    },
    filePath: {
      type: String,
      required: true,
    },
    category: String,
    views: {
      type: Number,
      default: 0,
    },
    duration: {
      type: String,
    },
    thumbnail:{
      type:String,
    }
  },
  { timestamps: true }
);

module.exports = Cours = model("lesson", CoursSchema);
