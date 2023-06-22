const router = require('express').Router();
const userController = require('../controllers/userController');

router.route('/').get(userController.getAllUsers);
router.route('/register').post(userController.registerUser);
router.route('/login').post(userController.loginUser);

module.exports = router;
