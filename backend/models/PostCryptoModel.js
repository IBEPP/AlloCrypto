const router = require("express").Router();
const mongoose = require("mongoose");

const postCryptSchema = mongoose.Schema(
  {
    ownerID:{
      type:mongoose.Types.ObjectId,
      ref:"user"
    },
    text: String,
    likes: [Number],
    // nameCryptoApi: String,
    time: Date,
  },
  {
    timestamps: true,
  }
);

const PostCryptModel = mongoose.model("postCrypt", postCryptSchema);

module.exports = PostCryptModel;
