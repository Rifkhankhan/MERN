const express = require('express');
const HttpError = require('../models/http-error');
const router = express.Router();
const UserController = require('../controllers/users-controller');

// here order is matter
router.get('/', UserController.getAllusers);

// router.get('/:userId', (req, res, next) => { // /api/users/any thing or /api/users
// 	res.status(200).json({ message: 'Users Routes is Working' });
// });

router.get('/user/:userId', UserController.getUserById);
router.post('/user/new', UserController.createUser);

module.exports = router;
