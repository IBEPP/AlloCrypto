const { model } = require('mongoose');
const CrytpoModel = require('../models/PostCryptoModel');
const ShareModel = require('../models/ShareModel');


module.exports.sharePost = (req,res,next)=>{
    const body = req.body;
     console.log(body)
     ShareModel.create(body)
     .then(result=>{
       console.log(result)
       res.json(body)

     })
}



module.exports.shareGet = (req,res,next)=>{
    const body = req.params.id
    ShareModel.find({})
    .populate('postID')
    .populate('posterID')
     .exec()
     .then(result=>{
       console.log(result)
       res.send(result)
     })
}

module.exports.shareProfilGet = (req,res,next)=>{
    const body = req.params.user
    ShareModel.where('posterID')
    .equals(body)
    .populate('posterID')
    .populate({
      path:'postID',
      populate:{
          path:'ownerID',
          model:'user'
      }
  
  })
    .exec()
    .then(result=>{
      console.log(result)
      res.json(result)
    })
  }

  module.exports.shareDelete = (req,res,next)=>{
    const body = req.body;
    ShareModel.findByIdAndDelete(body.id)
    .then(result=>{
      console.log(result)
    })
  }