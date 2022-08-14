const express = require('express');
const { check } = require('express-validator');

const AuthController = require('../controllers/auth-controllers');

const router = express.Router();

router.get('/', AuthController.getUsers);

router.post(
	'/login',
	[
		check('email').normalizeEmail().isEmail(),
		check('password').isLength({ min: 5 })
	],
	AuthController.login
);

router.post(
	'/logup',
	[
		check('name').not().isEmpty(),
		check('email').normalizeEmail().isEmail(),
		check('password').isLength({ min: 5 }),
		check('age').isNumeric().not().isEmpty()
	],
	AuthController.logup
);

module.exports = router;
