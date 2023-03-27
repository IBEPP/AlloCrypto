const UserModel = require("../models/UserModel");

module.exports.userPost = (req, res, next) => {
  const body = req.body;
  UserModel.findOne({ userName: body.userName })
    .exec()
    .then((result) => {
      if (result) {
        res.status(401).json({ Error: false });
      } else {
        UserModel.create({
          userName: body.userName,
          aboutMe: body.aboutMe,
          picture: body.picture,
          likesGlobal: body.likes,
          commentsGoblal: body.comments,
        }).then((result) => {
          res.json({ result });
          console.log(result);
        });
      }
      // res.status(200).json({Error:true})
      console.log(result);
    });
};

module.exports.userDelete = (req, res, next) => {
  const body = req.body;
  UserModel.deleteOne({ picture: body.picture }).then((result) =>
    console.log(result)
  );
};
module.exports.userPut = (req, res, next) => {
  const body = req.body;
  UserModel.updateOne(
    { userName: body.userName },
    { userName: "Erfan91" },
    { upsert: true }
  ).then((result) => {
    console.log(result);
  });
};
module.exports.userGet = (req, res, next) => {
  const userName = req.params.user;
  UserModel.find({ userName })
    .exec()
    .then((result) => {
      console.log(result);
      if (result.length) {
        res.json({ ok: true, user: result[0] });
      } else {
        res.status(401).json({ ok: false });
      }
    });
};

module.exports.userGetTopLikes = (req, res, next) => {
  UserModel.find()

    .sort({ likesGlobal: -1 })
    .exec()
    .then((result) => {
      res.json(result);
    });
};

module.exports.userGetTopComments = (req, res, next) => {
  UserModel.find()
    .sort({ commentsGlobal: -1 })
    .exec()
    .then((result) => {
      res.json(result);
      console.log("backend", result);
    });
};
