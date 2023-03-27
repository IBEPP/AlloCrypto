require("dotenv").config({ path: "./config/.env" });

require("./config/db.config");
const express = require("express");
const app = express();
const cors = require("cors");
const multer = require('multer');
const path = require('path')
const postRouter = require("./Router/post.router");
const userRouter = require("./Router/user.router");
const commentRouter = require("./Router/comment.router");
const cryptoRouter = require("./Router/crypto.router");
const CommentsModel = require("./models/CommentsModel");
const PostModel = require('./models/PostModel');
const ShareRouter = require('./Router/share.router')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/post", postRouter);
app.use("/user", userRouter);
app.use("/comment", commentRouter);
app.use("/crypto", cryptoRouter);
app.use("/share", ShareRouter);
app.use('/images',express.static('images'))
const PORT = 3002 || process.env.PORT;

app.get("/", (req, res) => {
  res.send("WELCOME TO THE GOULAG");
});

app.get("/comment/:id", (req, res, next) => {
  const body = req.params;

  CommentsModel.find({ postID: body.id })
    .populate("ownerID")
    .exec()
    .then((result) => {
      res.json(result);
      console.log(result);
    });
});

app.get("/post/:id", (req, res, next) => {
  const body = req.params;
 
  PostModel.find({_id:body.id})
  .exec()
  .then(result=>{
    res.json(result)
    console.log(result)
  })
})
let imageName ="";
const storage = multer.diskStorage({
  destination:path.join("./images"),
  filename:function (req,file,cb){
    imageName = Date.now() + path.extname(file.originalname);
    cb(null,imageName)
  },
})

const upload = multer({
  storage:storage,
  limits:{fileSize:3000000},
}).single('myImage');


app.post('/upload-image', (req,res)=>{
  upload(req,res,(err)=>{
    if(err){
      console.log(err)
    }else{
      console.log(req.body)
      return res.status(201)
      .json({url:`http://localhost:${PORT}/images/` + imageName});
      
    }
  })
})

app.listen(PORT, () => {
  console.log(`server satarted in PORT ${PORT}`);
});
