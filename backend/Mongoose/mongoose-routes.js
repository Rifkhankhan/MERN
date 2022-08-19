const express = require('express');

const MongooseController = require('./mongoose-controller');

const router = express.Router();

router.post('/create', MongooseController.createdUser);
router.get('/', MongooseController.getUsers);
router.get('/:userId', MongooseController.getUserById);
router.patch('/edit/:userId', MongooseController.updateUser);
router.delete('/delete/:userId', MongooseController.deleteUser);
router.post('/signup', MongooseController.signup);
router.post('/signin', MongooseController.signin);

module.exports = router;
