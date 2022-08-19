const mongoose = require('mongoose');
const UniqueValidator = require('mongoose-unique-validator');
const userSchema = new mongoose.Schema({
	name: { type: String, required: true},
	email:{ type: String, required: true,unique:true},
	password:{ type: String, required: true,minlength:5},
});

userSchema.plugin(UniqueValidator); // to use unique value
module.exports = mongoose.model('User', userSchema);
