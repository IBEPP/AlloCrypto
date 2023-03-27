const router = require("express").Router();
const userController = require("../controllers/User.controller");
router.post("/", userController.userPost);
router.get("/toplikes", userController.userGetTopLikes);
router.get("/topcomments", userController.userGetTopComments);
router.get("/:user", userController.userGet);
router.put("/", userController.userPut);
router.delete("/", userController.userDelete);

module.exports = router;
