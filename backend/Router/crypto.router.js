const router = require('express').Router();
const cryptoController = require('../controllers/PostCrypto.controller');
router.post("/", cryptoController.cryptoPost);
router.get("/", cryptoController.cryptoGet);
router.put("/", cryptoController.ceryptoPut);
router.delete("/", cryptoController.cryptoDelete);

module.exports = router;