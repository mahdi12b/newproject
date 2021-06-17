const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema(
  {
    professor: {
      type: Schema.Types.ObjectId,
      ref: "professor",
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: "student",
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
    responseTo: {
      type: Schema.Types.ObjectId,
      ref: "professor",
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = { Comment };
