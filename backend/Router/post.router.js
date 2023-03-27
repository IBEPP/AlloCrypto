const router = require("express").Router();
const postController = require("../controllers/Post.controllers");
router.post("/", postController.tweetPost);
router.post("/like",postController.tweetLike)
router.get("/", postController.tweetGet);
router.put("/", postController.tweetPut);
router.put("/edit",postController.tweetEditPut)
router.get("/profil/:user", postController.tweetProfilGet);
router.delete("/", postController.tweetDelete);

module.exports = router;
