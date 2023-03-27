const { default: mongoose } = require("mongoose")
const { populate } = require("../models/PostModel")
const PostModel = require("../models/PostModel")
const UserModel = require("../models/UserModel")

module.exports.tweetPost = (req, res, next) => {
    const body = req.body
            PostModel.create({
                createdAt: body.createdAt,
                likes: body.likes,
                comments: body.comments,
                ownerID: body.ownerID,
                text: body.text
            }).then(result => {
                res.json({ postId: result._id })
                console.log(result._id, 'JEJEJE')
            })
            console.log(PostModel)
      
    }

module.exports.tweetLike = (req, res, next) => {
    const body = req.body
    res.json(body)
    console.log(body)
}

module.exports.tweetDelete = (req, res, next) => {
    const body = req.body
    PostModel.deleteOne({ _id:body.postID})
    .then(result => {
        console.log(result)
        res.json({message:'Post deleted successfuly'})
    })
}

module.exports.tweetPut = (req, res, next) => {
    const body = req.body;
    const id = body.likerId;

    PostModel.find({ likes: { $in: id }, _id: body.filterId })
        .exec()
        .then(result => {

            if (result.length) {
                res.json({ exists: true })
                PostModel.updateOne({ _id: body.filterId }, { $pull: { likes: id } })
                    .then(response => {
                        console.log("removed Response", response)
                    })
                UserModel.findByIdAndUpdate(body.ownerID, { $inc: { likesGlobal: -1 } })
                    .then(reponse => {
                        console.log("substract like count", reponse)
                    }).catch(error => {
                        console.log(error);
                    })

            } else {
                console.log('in else', result);

                PostModel.updateOne({ _id: body.filterId }, { $push: { likes: id } }, { upsert: true })
                    .then(response => {
                        res.json({ exists: false })
                        console.log(response)
                    })
                UserModel.findByIdAndUpdate(body.ownerID, { $inc: { likesGlobal: 1 } })
                    .then(reponse => {
                        console.log("add like count", reponse)
                    }).catch(error => {
                        console.log(error);
                    })
            }
        })
}

module.exports.tweetEditPut = (req,res,next)=>{
    const body = req.body;
    PostModel.updateOne({_id:body.postID}, {$set:{text:body.text}})
    .then(result=>{
        res.json(result)
        console.log(result)
    })
}

module.exports.tweetGet = (req, res, next) => {
    PostModel.find({})
        .populate('ownerID', 'userName').sort({ createdAt: -1 })
        .exec()
        .then(result => {
            console.log(result)
            res.json({ result })
        })
}

module.exports.tweetProfilGet = (req,res,next)=>{
    const body = req.params.user
    PostModel.where('ownerID')
    .equals(body)
    .populate('ownerID')
    .exec()
    .then(result=>{
      console.log(result)
      res.json(result)
    })
  }