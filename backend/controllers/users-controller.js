const express = require('express');
const HttpError = require('../models/http-error');
const uuid = require('uuid/v4');
const DUMMY_USERS = [
	{
		id: 'u1',
		name: 'Rifkhan',
		age: 25
	},
	{
		id: 'u2',
		name: 'Nila',
		age: 22
	}
];

const getAllusers = (req, res, next) => {
	res.json(DUMMY_USERS);
	// res.json( DUMMY_USERS );
};

const createUser = (req, res, next) => {
	const { age, name } = req.body;

	const newUser = {
		id: uuid(),
		name: name,
		age: age
	};

	DUMMY_USERS.push(newUser);

	res.status(200).json({ newUser });
};

const getUserById = (req, res, next) => {
	// /api/users/user/any value or /api/users/user
	const userId = req.params.userId;
	const user = DUMMY_USERS.find((user) => user.id === userId);
	if (!user) {
		// return res
		// 	.status(404)
		// 	.json({ message: 'Could not find any place for this id' });
		throw new HttpError('Could not find a user for the provided id', 404); // should not return this because it defaultly return it self
	}

	res.status(200).json({ user });
};
exports.createUser = createUser;
exports.getAllusers = getAllusers;

exports.getUserById = getUserById;
