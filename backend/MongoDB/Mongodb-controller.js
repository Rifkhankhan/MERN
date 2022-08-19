// npm install --save mongodb
const MongoClient = require('mongodb').MongoClient;
const url =
	'mongodb+srv://rifkhan:L30izkgwI0qByOTT@cluster0.t1bmyvd.mongodb.net/product?retryWrites=true&w=majority';

const createProduct = async (req, res, next) => {
	const newPlace = {
		name: req.body.name,
		price:req.body.price
	};

	const client = new MongoClient(url);
	let result;
	try {
		await client.connect();
		const db = client.db();
		result = await db.collection().insertOne(newPlace);
	} catch (error) {
		return res.json('error');
	}

	client.close();

	res.json(newPlace);
};

const getProducts = async (req, res, next) => {
	const client = new MongoClient(url);
	let result;
	try {
		await client.connect();
		const db = client.db();
		result = await db.collection().find().toArray();
	} catch (error) {
		return res.json('error');
	}

	client.close();

	res.json(result);
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
