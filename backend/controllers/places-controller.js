const HttpError = require('../models/http-error');

let DUMMY_PLACES = [
	{
		id: 'p1',
		title: 'Empire State Building',
		description: 'onr of the famous sky ',
		userId: 'u1'
	},
	{
		id: 'p2',
		title: 'place2',
		description: 'this is place2 ',
		userId: 'u1'
	},
	{
		id: 'p3',
		title: 'place3',
		description: 'this is place3 ',
		userId: 'u2'
	}
];

const getPlaces = (req, res, next) => {
	console.log('Get Request in Places');
	res.status(200).json({places:DUMMY_PLACES});
};

const getPlaceByPlaceId = (req, res, next) => {
	const placeId = req.params.placeId;
	const place = DUMMY_PLACES.find((place) => place.id === placeId);

	if (!place) {
		return next(new HttpError('Could not find a place for provided id.', 404)); // should return this if else the next code also execute
	}

	res.json({ place: place });
};

const getPlacesByUserId = (req, res, next) => {
	const userId = req.params.userId;

	const places = DUMMY_PLACES.filter((place) => place.userId === userId);

	if (!places) {
		return next(
			new HttpError('Could not find a place for provided user id.', 404)
		); // should return this if else the next code also execute
	}
	res.status(200).json({ message: 'Place Find Successfully', places: places });
};

const updatePlace = (req, res, next) => {
	const placeId = req.params.placeId
	const placeShouldBeUpdated = DUMMY_PLACES.find(place=>place.id === placeId)
	const indexOfUpdatePlace = DUMMY_PLACES.findIndex(place=>place.id === placeId)

	const {title,userId} = req.body

	placeShouldBeUpdated.title = title
	placeShouldBeUpdated.userId = userId
	DUMMY_PLACES[indexOfUpdatePlace] = placeShouldBeUpdated

	res.status(200).json({message:'Updated Successfully',places:placeShouldBeUpdated})

	// DUMMY_PLACES[indexOfUpdatePlace] = {...placeShouldBeUpdated,title,userId}
	// res.status(200).json({message:'Updated Successfully',places:DUMMY_PLACES})
};

const deletePlace = (req, res, next) => {
	const placeId = req.params.placeId

	DUMMY_PLACES = DUMMY_PLACES.filter(place=>place.id !== placeId)

	res.status(200).json({message:"Successfully Deleted",DUMMY_PLACES})
};

exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
exports.getPlacesByUserId = getPlacesByUserId;
exports.getPlaceByPlaceId = getPlaceByPlaceId;
exports.getPlaces = getPlaces;
