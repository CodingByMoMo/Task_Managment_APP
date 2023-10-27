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
	try {
		await mongoose.connect(
			'mongodb+srv://bartek:eU2kUinWQNztArlQ@tasks.2hqyuqo.mongodb.net/?retryWrites=true&w=majority'
		);
	} catch (error) {
		console.log(error);
	}
}

module.exports = {
	connectToDatabase,
};
