const router = require("express").Router();
const chatController = require("../controllers/chatController");
const { verifyAndAuthorization, verifyToken } = require("../middleware/verifyTocken");

router.post("/", verifyAndAuthorization, chatController.accessChat);

router.get("/", verifyAndAuthorization, chatController.getChats);


module.exports = router