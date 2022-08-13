const express = require('express');

const router = express.Router();
const PlacesController = require('../controllers/places-controller');

router.get('/', PlacesController.getPlaces);

router.get('/:placeId', PlacesController.getPlaceByPlaceId);

router.get('/user/:userId', PlacesController.getPlacesByUserId);

router.patch('/:placeId', PlacesController.updatePlace);

router.delete('/:placeId', PlacesController.deletePlace);

module.exports = router;

/*

const express = require('express');
const router = express.Router();
//write routers
module.exports = router;

then in server file

const placesRouter = require('./routes/places-routes)
app.use(placesRouter)
app.use((error,req,res,next)=>{

})

*/
