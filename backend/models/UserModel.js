const router = require("express").Router();
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: String,
    aboutMe: String,
    picture: String,
    likesGlobal: {
      type: Number,
      default: 0
    },
    commentsGlobal: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
