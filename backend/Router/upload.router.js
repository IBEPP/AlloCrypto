const UploadControllers = require("../controllers/Upload.controllers");
const router = require("express").Router();
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/upload"),
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
  dest: path.join(__dirname, "public/upload"),
}).single("image");

router.get("/", UploadControllers.uploadGet);
router.post("/", upload, UploadControllers.uploadPost);

module.exports = router;

// const router = require("express").Router();
// const path = require("path");
// const multer = require("multer");

// router.get("/", (req, res) => {
//   res.render("index");
// });

// const storage = multer.diskStorage({
//   destination: path.join(__dirname, "../public/upload"),
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// // // Middlewares
// const upload = multer({
//   storage,
//   dest: path.join(__dirname, "public/upload"),
// }).single("image");

// router.post("/", upload, (req, res) => {
//   console.log(req.file);
//   res.send("enviado");
// });
