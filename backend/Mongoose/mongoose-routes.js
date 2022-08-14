const express = require('express');

const MongoController = require('./mongoose');

const router = express.Router();

router.post('/create', MongoController.createdUser);
// router.get('/', MongoController.getPlaces);

module.exports = router;
