const router = require("express").Router();
const messageController = require("../controllers/messageController");
const { verifyAndAuthorization, verifyToken } = require("../middleware/verifyTocken");

router.post("/", verifyAndAuthorization, messageController.sendMessage);

router.get("/:id", verifyAndAuthorization, messageController.getAllMessages);


module.exports = router