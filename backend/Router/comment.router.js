const router = require('express').Router();
const commentController = require('../controllers/Comment.controller')
router.post("/", commentController.commentPost);
router.get("/:id", commentController.commentGetById);
router.get("/", commentController.commentGet);
// THIS IS IMPORTANT
router.put("/", commentController.commentPut);
router.get("/profil/:user", commentController.commentProfilGet);
router.delete("/", commentController.commentDelete);

module.exports = router;