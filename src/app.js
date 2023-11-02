const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const logger = require('morgan');
const passport = require('passport');
const authenticate = require('./authenticate');
const dotenv = require('dotenv');

const models = require('./models');
//  import user Schema
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const sessionTime = 1000 * 60 * 60 * 24;

const app = express();
dotenv.config();

app.use(
	session({
		secret: process.env.SESSION_KEY,
		saveUninitialized: true,
		cookie: { maxAge: sessionTime },
		resave: false,
	})
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//  connect to database
models.connectToDatabase();
models.setDatabaseToStrict();

//  Setup a authentication with passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);

//  Setup a authorization checkup
app.use((req, res, next) => {
	if (!req.user) {
		const err = new Error('You need to authenticate!');
		err.status = 403;
		next(err);
	} else {
		next();
	}
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('../client/bulid'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
