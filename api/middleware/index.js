const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../secrets');
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
const only = role_name => (req, res, next) => {
	console.log(`desired role_name: ${role_name}`);
	console.log(`actual role_name: ${req.decodedJwt.role}`);

	if (role_name === req.decodedJwt.role_name) {
		next();
	} else {
		next({
			status: 403,
			message: 'This is not for you'
		});
	}
};

const validateRoleName = async (req, res, next) => {
	let { role_name } = req.body;
	if (!role_name || role_name.trim() === '') {
		req.role_name = 'student';
		next();
	} else if (role_name.trim() === 'admin') {
		next({ status: 422, message: 'Role name can not be admin' });
	} else {
		role_name = role_name.trim();
		if (role_name.length > 32) {
			next({
				status: 422,
				message: 'Role name can not be longer than 32 chars'
			});
		} else {
			req.role_name = role_name;
			next();
		}
	}
};

// checks if username exists in database
function checkUsernameExists(req, res, next) {
	const { username } = req.user;
	Users.findBy({ username })
		.then(user => {
			if (user) {
				req.validUser = user;
				next();
			} else {
				next({ status: 401, message: 'invalid credentials' });
			}
		})
		.catch(next);
}

function checkUsernameUnique(req, res, next) {
	const { username } = req.user;
	Users.findBy({ username })
		.then(user => {
			if (user) {
				next({ status: 401, message: 'username taken' });
			} else {
				next();
			}
		})
		.catch(next);
}

// check is username and password meet criteria thresh holds
async function validateCredentials(req, res, next) {
	let { username, password } = req.body;
	if (
		!username ||
		username.trim() === '' ||
		!password ||
		password.trim() === ''
	) {
		next({ status: 400, message: 'username and password required' });
	} else {
		req.user = {
			username: username.trim(),
			password: password.trim()
		};
		next();
	}
}

module.exports = {
	restricted,
	checkUsernameExists,
	validateRoleName,
	checkUsernameUnique,
	validateCredentials,
	only,
	logger
};
