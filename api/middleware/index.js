const jwt = require('jsonwebtoken');
const { JWT_SECRET, AUTH_CODE } = require('../secrets');
const Users = require('../users/users-model');

function logger(req, res, next) {
	console.log(`[${new Date().toLocaleString()}] [${req.method}] ${req.path}`);
	next();
}

// prevents access to certain endpoints
const restricted = (req, res, next) => {
	const token = req.headers.authorization;
	if (token) {
		jwt.verify(token, JWT_SECRET, (err, decoded) => {
			if (err) {
				next({ status: 401, message: 'token invalid' });
			} else {
				req.decodedJwt = decoded;
				next();
			}
		});
	} else {
		next({ status: 401, message: 'Token Required' });
	}
};

// FOR AUTH ROUTER
// checks if username exists in database
function checkUsernameExists(req, res, next) {
	const { username } = req.user;
	Users.findUserBy({ username })
		.then(user => {
			if (user) {
				req.validUser = user;
				console.log('Validated User: ', user);
				next();
			} else {
				next({
					status: 401,
					message: 'invalid credentials/username does not exist'
				});
			}
		})
		.catch(next);
}

// check is username and password meet criteria thresholds
async function validateCredentials(req, res, next) {
	const { username, password } = req.body;
	if (
		!username ||
		username.trim() === '' ||
		!password ||
		password.trim() === ''
	) {
		next({ status: 400, message: 'username and password required' });
	} else if (username.trim().length < 3 || username.trim().length > 25) {
		next({
			status: 400,
			message: 'username must be between 3 and 25 chars'
		});
	} else if (password.trim().length < 3 || password.trim().length > 25) {
		next({
			status: 400,
			message: 'password must be between 3 and 25 chars'
		});
	} else {
		req.user = {
			username: username.trim(),
			password: password.trim()
		};
		next();
	}
}

function checkUsernameUnique(req, res, next) {
	const { username } = req.user;
	Users.findUserBy({ username })
		.then(user => {
			if (user) {
				next({ status: 401, message: 'Username taken' });
			} else {
				next();
			}
		})
		.catch(next);
}

// checks authorization code to see if new user qualifies as instructor
async function validateAuthLevel(req, res, next) {
	const { authCode } = req.body;
	if (!authCode || authCode.trim() === '' || authCode.trim() !== AUTH_CODE) {
		req.user.role_id = 1; // client
		next();
	} else {
		req.user.role_id = 2; // instructor
		next();
	}
} // END AUTH ROUTER

// checks role to see if user has access to desired location
function only(req, res, next) {
	if (req.decodedJwt.role_name === 'instructor') {
		next();
	} else {
		next({
			status: 403,
			message: 'Get off my lawn. You are not an instructor'
		});
	}
}

// checks authorization code to see if new user qualifies as instructor
//also need to adjust class size based on enrollment
function checkIfSpaceInClass(req, res, next) {}

module.exports = {
	only,
	restricted,
	checkUsernameExists,
	checkIfSpaceInClass,
	checkUsernameUnique,
	validateCredentials,
	validateAuthLevel,

	logger
};
