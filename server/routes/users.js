const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const User = require('../models/userModel');
const router = express.Router();

router.use(bodyParser.json());
/* GET users listing. */
router.get('/', function (req, res, next) {
	res.send('respond with a resource');
});

//  Api endpoint for user Authentication
router.post('/login', passport.authenticate('local'), (req, res, next) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'application/json');
	res.json({ success: true, status: 'You are successfully logged in!' });
});

router.post('/signin', (req, res, next) => {
	User.register(
		new User({
			username: req.body.username,
			email: req.body.email,
			name: req.body.name,
		}),
		req.body.password,
		(err, user) => {
			if (err) {
				res.statusCode = 500;
				res.setHeader('Content-Type', 'application/json');
				res.json({ err: err });
			} else {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json({ success: true, status: 'Registration Successful!' });
			}
		}
	);
});

router.post('/logout', (req, res, next) => {
	if (req.session) {
		req.session.destroy();
		res.clearCookie('session-id');
		res.redirect('/');
	} else {
		const err = new Error('You are not logged in!');
		err.status = 403;
		next(err);
	}
});

module.exports = router;
