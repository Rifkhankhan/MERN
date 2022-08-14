// npm init
//npm install express --save
//npm install  --save uuid
// npm install --save-dev nodemon // reload the server whenever something is changed

//Rifkhan1 => L30izkgwI0qByOTT

const express = require('express');
const bodyParser = require('body-parser');
const HttpError = require('./models/http-error');
const placesRouter = require('./routes/places-routes');
const usersRouter = require('./routes/users-routes');
const authRouter = require('./routes/auth-routes');
// const mongoRouter = require('./MongoDB/mongo-router')
const mongooseRouter = require('./Mongoose/mongoose-routes');
const app = express();

app.use(bodyParser.json()); // to get body ,this should be used before routers

app.use('/api/places', placesRouter); // if the route only start with api/places it will render places routes
app.use('/api/users', usersRouter); // if the route only start with api/places it will render places routes
app.use('/api/auth', authRouter); // if the route only start with api/places it will render places routes
// app.use('/api/mongodb',mongoRouter) // if the route only start with api/places it will render places routes
app.use('/api/mongoose', mongooseRouter); // if the route only start with api/places it will render places routes

// for unsupported router error handler

app.use((req, res, next) => {
	const error = new HttpError('could not find this route..');
	throw error;
});

//after using all routes
app.use((error, req, res, next) => {
	if (res.sendHeader) {
		return next(error);
	}
	res
		.status(error.code || 500)
		.json({ message: error.message || 'An Unknown Error Occurred!' });
});

app.listen(5000); // start Node + Express server on port 5000








// // CORS Headers => Required for cross-origin/ cross-server communication
// app.use((req, res, next) => { //middleware
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
// 		'Access-Control-Allow-Headers',
// 		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
// 	);
//   res.setHeader(
// 		'Access-Control-Allow-Methods',
// 		'GET, POST, PATCH, DELETE, OPTIONS'
// 	);
//   next();
// });

/*
const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid/v4');
const app = express();

// write middlewares
// app.get()
//app.post()

app.listen(5000); // start Node + Express server on port 5000


// app.get('/products', (req, res, next) => {
//   res.status(200).json({ products: DUMMY_PRODUCTS });
// });

// app.post('/product', (req, res, next) => {
//   const { title, price } = req.body;

//   if (!title || title.trim().length === 0 || !price || price <= 0) {
//     return res.status(422).json({
//       message: 'Invalid input, please enter a valid title and price.'
//     });
//   }

//   const createdProduct = {
//     id: uuid(),
//     title,
//     price
//   };

//   DUMMY_PRODUCTS.push(createdProduct);

//   res
// 		.status(201)
// 		.json({ message: 'Created new product.', product: createdProduct });
// });
*/
