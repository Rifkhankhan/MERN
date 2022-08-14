const mongoose = require('mongoose');
const UserModel = require('./user');

mongoose
	.connect(
		// 'mongodb+srv://Rifkhan1:L30izkgwI0qByOTT@mern.fjwnop0.mongodb.net/?retryWrites=true&w=majority'
        'mongodb+srv://rifkhan:L30izkgwI0qByOTT@cluster0.t1bmyvd.mongodb.net/?retryWrites=true&w=majority'
	)
	.then(() => {
		console.log('connected to Database');
	})
	.catch(() => {
		console.log('somthing wrong');
	});

const createdUser = async (req, res, next) => {
	const newUser = new UserModel({
		name: req.body.name,
		age: req.body.age
	});

	const result = await newUser.save();
	res.json(result);
};

const getUsers = async (req, res, next) => {
	const products = await UserModel.find().exec();
	res.json(products);
};

exports.createdUser = createdUser;
exports.getUsers = getUsers;
