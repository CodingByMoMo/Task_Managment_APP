const mongoose = require('mongoose');
/**
 * Models module.
 * Main MongoDB functions.
 * @module models/index
 *
 */

/**
 * @function connectToDatabase
 * @async
 */
async function connectToDatabase() {
	const mongoURI = process.env.DB_URI;
	try {
		await mongoose.connect(mongoURI);
	} catch (error) {
		console.log(error);
	}
}

function setDatabaseToStrict() {
	mongoose.set('strictQuery', false);
}

module.exports = {
	connectToDatabase,
	setDatabaseToStrict,
};
