const router = require('express').Router();
const userController = require('../controllers/userController');
const { verifyAndAuthorization,verifyToken, verifyAndAdmin } = require('../middleware/verifyTocken');



router.put('/:id',verifyAndAuthorization,userController.updatedUser);
router.delete('/:id',verifyAndAuthorization,userController.deleteUser);
router.get('/:id',verifyAndAuthorization,userController.getUser);
router.get('/',verifyAndAdmin,userController.getAllUser);

module.exports = router