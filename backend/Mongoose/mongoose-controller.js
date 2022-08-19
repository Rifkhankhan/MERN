const mongoose = require('mongoose');
const HttpError = require('../models/http-error');
const UserModel = require('./user-model'); // we can say User
const Place = require('.//place-model'); // we can say User
// npm install --save mongoose
const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');

const createdUser = async (req, res, next) => {
	const newUser = new UserModel({
		// name: req.body.name,
		// age: req.body.age

		name: req.body.name,
		email: req.body.email,
		password: req.body.password
		// places: [] // // once we add a place it automatically added
	});
	// here we can get the create user
	try {
		await newUser.save();
	} catch (err) {
		const error = new HttpError('Creating user failed,try again', 500);
		return next(error);
	}
	// here we can get the id here
	// we can get id as a string from id
	// we can get id as a object from _id

	res.status(201).json({ newUser });
};

const createdPlace = async (req, res, next) => {
	const newPlace = new Place({
		name: req.body.name,
		image: req.body.image,
		description: req.body.description,
		// creator:
	});
	// here we can get the create user
	try {
		await newUser.save();
	} catch (err) {
		const error = new HttpError('Creating user failed,try again', 500);
		return next(error);
	}
	// here we can get the id here
	// we can get id as a string from id
	// we can get id as a object from _id

	res.status(201).json({ newUser });
};

const getUserById = async (req, res, next) => {
	const { userId } = req.params;
	let user;
	try {
		user = await UserModel.findById(userId);
		// user = await UserModel.find({userId:userId}).exec();
		// user = await UserModel.findById(userId).exec(); // also use this
		console.log('Successfully Get User');
	} catch (err) {
		console.log('Id is not Matched');
		const error = new HttpError('finding user failed bt id,try again', 500);
		return next(error);
	}

	if (!user) {
		const error = new HttpError('finding user failed,try again', 500);
		return next(error);
	}

	// return res.status(201).json(user);
	// {
	// 	"_id": "62fe85b75cd930741ef32668",
	// 	"name": "Nila",
	// 	"age": 15,
	// 	"__v": 0
	// }

	return res.status(201).json({ user: user.toObject({ getters: true }) });
	// {
	// 	"user": {
	// 		"_id": "62fe85b75cd930741ef32668",
	// 		"name": "Nila",
	// 		"age": 15,
	// 		"__v": 0,
	// 		"id": "62fe85b75cd930741ef32668"
	// 	}
	// }
};

const updateUser = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw new HttpError('Invalid inputs passed, please check your data.', 422);
	}

	// const { name, age } = req.body;
	const { name, email, password } = req.body;

	const userId = req.params.userId;

	let user;
	try {
		user = await UserModel.findById(userId);
	} catch (err) {
		const error = new HttpError(
			'Something went Wrong,Could not update Place',
			500
		);
		return next(error);
	}
	// user.name = name;
	// user.age = age;

	user.name = name;
	user.email = email;
	user.password = password;
	try {
		await user.save();
	} catch (err) {
		const error = new HttpError(
			'Something went Wrong,Could not update Place',
			500
		);
		return next(error);
	}

	res.status(201).json({ user: user.toObject({ getters: true }) });
};

const deleteUser = async (req, res, next) => {
	const userId = req.params.userId;
	let user;
	try {
		user = await UserModel.findById(userId);
	} catch (err) {
		const error = new HttpError(
			'Something went wrong, could not delete user',
			500
		);
		return next(error);
	}

	try {
		await user.remove();
	} catch (err) {
		const error = new HttpError(
			'Something went wrong, could not delete user',
			500
		);
		return next(error);
	}
	res.status(200).json({ message: 'Deleted User' });
};

const signup = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw new HttpError('Invalid inputs passed, please check your data.', 422);
		// return next(new HttpError('Invalid inputs passed, please check your data.', 422)); // batter to use this
	}

	const { name, email, password } = req.body;
	// const { name, email, password } = req.body;
	let existingUser;
	try {
		existingUser = await UserModel.findOne({ email: email }); // check user is existing or not
	} catch (err) {
		const error = new HttpError('signing up failed ', 500);
		return next(error);
	}

	if (existingUser) {
		const error = new HttpError('User Already Exist', 422);
		return next(error);
	}

	const newUser = new UserModel({
		id: uuid(),
		name: name,
		email: email,
		password: password
		// places: [] here when add here place add initially
	});

	try {
		await newUser.save();
	} catch (err) {
		const error = new HttpError('signing up failed could not save ', 500);
		return next(error);
	}

	res.status(200).json('Sign up Successfully');
};

const signin = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw new HttpError('Invalid inputs passed, please check your data.', 422);
		// return next(new HttpError('Invalid inputs passed, please check your data.', 422)); // batter to use this
	}

	const { email, password } = req.body;

	let identifyUser;
	try {
		identifyUser = await UserModel.findOne({ email: email });
	} catch (err) {
		const error = new HttpError('signing up failed could not save ', 500);
		return next(error);
	}

	if (!identifyUser || identifyUser.password !== password) {
		const error = new HttpError('Email Address or Password is not Valid', 422);
		return next(error);
	}

	res.status(200).json('Sign in');
};
const getUsers = async (req, res, next) => {
	let users;

	try {
		users = await UserModel.find({}, 'email name'); // only get email and name
		// users = UserModel.find({}, '-password'); // get things except password
	} catch (err) {
		const error = new HttpError('signing up failed could not save ', 500);
		return next(error);
	}

	if (!users || users.length === 0) {
		const error = new HttpError('There is no users', 422);
		return next(error);
	}

	res
		.status(200)
		.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

exports.createdUser = createdUser;
exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.signup = signup;
exports.signin = signin;
