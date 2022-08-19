const mongoose = require('mongoose');
const UniqueValidator = require('mongoose-unique-validator');
const placeSchema = new mongoose.Schema({
	name: { type: String, required: true },
	image: { type: String, required: true, unique: true },
	description: { type: String, required: true, minlength: 5 },
    creator: { type: mongoose.Types.ObjectId, required: true ,ref:'User'} 
});

placeSchema.plugin(UniqueValidator); // to use unique value
module.exports = mongoose.model('Place', placeSchema);

