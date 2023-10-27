const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

//  Define a User Schema
const User = new Schema({
	firstName: String,
	lastName: String,
	username: {
		type: String,
		index: true,
	},
	email: String,
	password: String,
});

//  Add passport-local-mongoose as a plugin to user schema;
User.plugin(passportLocalMongoose);

//  Export user as a mongoose model;
module.exports = mongoose.model('User', User);
