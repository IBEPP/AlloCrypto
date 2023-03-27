const router = require("express").Router();
const mongoose = require("mongoose");



const commentSchema = new mongoose.Schema(
  {
    ownerID: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },

    postID: {
      type: mongoose.Types.ObjectId,
      ref: "post",
    },

    text: String,
  },
  { timestamps: true }
);

const CommentsModel = mongoose.model("comments", commentSchema);

module.exports = CommentsModel;
