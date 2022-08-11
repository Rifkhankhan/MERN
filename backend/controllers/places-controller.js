const HttpError = require('../models/http-error');

const DUMMY_PLACES = [
	{
		id: 'p1',
		title: 'Empire State Building',
		description: 'onr of the famous sky '
	}
];

const getPlaces = (req, res, next) => {
	console.log('Get Request in Places');
	res.status(200).json({ message: 'Places Route is Working' });
};

const getPlaceByPlaceId = (req, res, next) => {
	const placeId = req.params.placeId;
	const place = DUMMY_PLACES.find((place) => place.id === placeId);

	if (!place) {
		return next(new HttpError('Could not find a place for provided id.', 404)); // should return this if else the next code also execute
	}

	res.json({ place: place });
};

const getPlaceByUserId = () => {};

exports.getPlaceByPlaceId = getPlaceByPlaceId;
exports.getPlaces = getPlaces;
