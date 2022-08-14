// npm install --save mongodb
// npm install --save mongoose
const MongoClient = require('mongodb').MongoClient;
const url =
	'mongodb+srv://Rifkhan:rifkhan123@mern.fjwnop0.mongodb.net/mern?retryWrites=true&w=majority';

const createPlace = async (req, res, next) => {
	const newPlace = {
		name: req.body.name
	};

	const client = new MongoClient(url);
	let result;
	try {
		await client.connect();
		const db = client.db();
		result = db.collection('places').insertOne(newPlace);
	} catch (error) {
		return res.json('error');
	}

	client.close();

	res.json(newPlace);
};

const getPlaces = async (req, res, next) => {
	const client = new MongoClient(url);
	let result;
	res.json(client);
	try {
		await client.connect();
		const db = client.db();
		result = db.collection('places').find().toArray();
	} catch (error) {
		return res.json('error');
	}

	client.close();

	res.json(result);
};

exports.createPlace = createPlace;
exports.getPlaces = getPlaces;
