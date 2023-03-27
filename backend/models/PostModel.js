const router = require("express").Router();
const mongoose = require("mongoose");


const postSchema = new mongoose.Schema({
  createdAt: Date,
  ownerID: {
    type: mongoose.Types.ObjectId,
    ref: "user"
  },
  likes: [String],
  text: String,
  postID:String,
  commentCount:{type:Number, default:0},//to add one each time we add a comment
  },
  {
    timestamps:true
  });

const PostModel = mongoose.model("post", postSchema);

module.exports = PostModel;
