const mongoose = require("mongoose");


const ShareSchema = new mongoose.Schema({
    posterID:{
      type:mongoose.Types.ObjectId,
      ref:'user'
    },
    postID:{
      type:mongoose.Types.ObjectId,
      ref:"post"
    }
  })
  ShareSchema.set('toObject', { virtuals: true })
  ShareSchema.set('toJSON', { virtuals: true })
  const ShareModel = mongoose.model('Share', ShareSchema,"shares");

  module.exports = ShareModel;