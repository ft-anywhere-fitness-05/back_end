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

// checks role to see if user has access to desired location
const only = auth_level => (req, res, next) => {
	console.log(`desired role_name: ${auth_level}`);
	console.log(`actual role_name: ${req.decodedJwt.auth_level}`);

	if (auth_level === req.decodedJwt.auth_level) {
		next();
	} else {
		next({
			status: 403,
			message: 'Get off my lawn. You are not an instructor'
		});
	}
};

// don't need this??
// const validateRoleName = async (req, res, next) => {
// 	let { role_name } = req.body;
// 	if (!role_name || role_name.trim() === '') {
// 		req.role_name = 'student';
// 		next();
// 	} else if (role_name.trim() === 'admin') {
// 		next({ status: 422, message: 'Role name can not be admin' });
// 	} else {
// 		role_name = role_name.trim();
// 		if (role_name.length > 32) {
// 			next({
// 				status: 422,
// 				message: 'Role name can not be longer than 32 chars'
// 			});
// 		} else {
// 			req.role_name = role_name;
// 			next();
// 		}
// 	}
// };

// checks if username exists in database

function checkUsernameExists(req, res, next) {
	const { username } = req.user;
	Users.findUserBy({ username })
		.then(user => {
			if (user) {
				req.validUser = user;
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
}

module.exports = {
	restricted,
	checkUsernameExists,
	// validateRoleName,
	checkUsernameUnique,
	validateCredentials,
	validateAuthLevel,
	only,
	logger
};
