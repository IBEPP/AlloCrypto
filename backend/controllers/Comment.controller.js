const CommentsModel = require('../models/CommentsModel');
const UserModel = require("../models/UserModel");
const PostModel = require("../models/PostModel");

module.exports.commentPost = (req, res, next) => {
    const body = req.body;

    CommentsModel.create(body).then(result => {
        res.json(result)
        console.log("nouveau comment a linstant", result)
    })

    PostModel.findByIdAndUpdate(body.postID, {$inc: {commentCount:1}})
        .exec()
        .then(infoPost =>  UserModel.findByIdAndUpdate(infoPost.ownerID, { $inc: { commentsGlobal: 1 } })
        .then(reponse => {
            console.log("add comment count", reponse)
        }).catch(error => {
            console.log(error);
        }))    

}

module.exports.commentDelete = (req, res, next) => {
    const body = req.body;
    console.log("BODYYYYYY",body)
    CommentsModel.deleteOne({ _id: body.id }).then(result => {
        console.log(result)
        res.json({message:'comment deleted successfuly'})
        PostModel.findByIdAndUpdate(body.postID,{$inc:{commentCount:-1}})
        .exec()
        .then(response=>{
            console.log("RESPSOSOSOSOSOSOSOSOSOSOSOSOSSOSOSOSOSOSOSOSOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO",response)
        })
    })
}

module.exports.commentPut = (req, res, next) => {
  const body = req.body
    CommentsModel.updateOne({ _id: body.id }, { text: body.text })
        .then(result => {
            console.log(result)
            res.json({message:'comment modified'})
        })
}

module.exports.commentGet = (req, res, next) => {
    CommentsModel.find({}).populate('ownerID').exec()
        .then(result => res.json(result))
}

module.exports.commentGetById = (req, res, next) => {
    const body = req.params;
    CommentsModel.find({ postID: body.id })
        .populate('ownerID')
        .sort({ createdAt: -1 })
        .exec()
        .then(result => {
            res.json(result)
            console.log(result)
        })
}

module.exports.commentProfilGet = (req, res, next) => {
    const body = req.params.user
    CommentsModel.where('ownerID')
    .equals(body)
    .sort({createdAt:-1})
    .populate('ownerID')
    .populate({
        path:'postID',
        populate:{
            path:'ownerID',
            model:'user'
        }
    
    })
    .exec()
    .then(result=>{
      console.log('OOOOOOOOOOOOOOOOOOOOOOOOOOOOO',result)
      res.json(result)
   
    })
}
