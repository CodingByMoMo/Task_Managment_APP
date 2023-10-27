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
router.post('/auth/login', (req, res) => {
	res.send('user login');
});

router.post('/auth/signin', (req, res) => {
	res.send('user auth');
});

router.post('/auth/logout', (req, res) => {
	res.send('user auth');
});

module.exports = router;
