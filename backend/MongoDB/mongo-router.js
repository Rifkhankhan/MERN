const express = require('express');

const MongoController = require('./Mongodb');

const router = express.Router();

router.post('/create', MongoController.createPlace);
router.get('/', MongoController.getPlaces);

module.exports = router;
