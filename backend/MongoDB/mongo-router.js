const express = require('express');

const MongoController = require('./Mongodb-controller');

const router = express.Router();

router.post('/create', MongoController.createProduct);
router.get('/', MongoController.getProducts);

module.exports = router;
