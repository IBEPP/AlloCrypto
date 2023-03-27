const CrytpoModel = require('../models/PostCryptoModel');

module.exports.cryptoPost = (req,res,next)=>{
    const body = req.body
    CrytpoModel.create({
        text:body.text,
        ownerID:body.ownerID
    }).then(result=>{
        console.log("CRYPTO RESULT",result)
        res.json(result)
    })
}

module.exports.cryptoDelete = (req,res,next)=>{
    const body = req.body;
     
}

module.exports.ceryptoPut = (req,res,next)=>{
    const body = req.body
}

module.exports.cryptoGet = (req,res,next)=>{
    const body = req.body
    CrytpoModel.find({})
    .sort({createdAt:-1})
    .populate('ownerID')
    .exec()
    .then(result=>{
        console.log(result[0]);
        res.json(result);
    })
}