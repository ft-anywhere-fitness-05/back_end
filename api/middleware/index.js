const jwt = require('jsonwebtoken');
const { JWT_SECRET, AUTH_CODE } = require('../secrets');
const db = require('../data/dbConfig');
const Users = require('../users/users-model');
const UsersClasses = require('../user-classes/user-class-model');
const Types = require('../types/type-model');

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

function checkUserExistsById(req, res, next) {
	const { user_id } = req.params;
	Users.findUserById(user_id || req.body.user_id)
		.then(user => {
			if (!user) {
				next({
					status: 400,
					message: 'User not found'
				});
			} else {
				next();
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
			// ...req.body,
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
			message: 'Get off my lawn. You are Not an instructor'
		});
	}
}

function validateTypeId(req, res, next) {
	let typeIdToBeChecked = req.body.type_id;
	// if (!typeIdToBeChecked || typeIdToBeChecked.trim() === '') {
	if (!typeIdToBeChecked) {
		next({
			status: 400,
			message: `Where's the type_id?`
		});
	} else {
		// typeIdToBeChecked = typeIdToBeChecked.trim();
		Types.findAllTypes()
			.then(types => {
				return types.some(type => type.type_id === typeIdToBeChecked);
			})
			.then(matchedType => {
				if (!matchedType) {
					next({
						status: 400,
						message: `Type ID not found`
					});
				} else {
					next();
				}
			})
			.catch(next);
	}
}

// check if the minimum requirements have been met to create a new class
function validateClassInfo(req, res, next) {
	const { class_name, location, date, start_time, type_id } = req.body;
	if (
		!class_name ||
		class_name.trim() === '' ||
		!location ||
		location.trim() === '' ||
		!date ||
		!start_time ||
		!type_id
	) {
		next({
			status: 400,
			message:
				'Required minimums to create a class: class name, a location, a date, a start time, and a type (id)'
		});
	} else {
		req.body = {
			...req.body,
			class_name: req.body.class_name.trim(),
			location: req.body.location.trim()
			// type_id: req.body.type_id,
			// description: req.body.description ? req.body.description.trim() : ''
		};
		// req.body.class_name = class_name.trim();
		// req.body.location = location.trim();
		// req.body.type_id = type_id.trim();
		// req.body.description = req.body.description.trim();
		next();
	}
}

function checkIfAlreadyEnrolled(req, res, next) {
	const { user_id, class_id } = req.body;

	UsersClasses.findReservation(user_id, class_id)
		.then(reservation => {
			if (reservation) {
				next({
					status: 400,
					message: 'Spot already reserved for this client'
				});
			} else {
				next();
			}
		})
		.catch(next);
}

// checks authorization code to see if new user qualifies as instructor
async function checkIfClassHasSpace(req, res, next) {
	const theClass = await db('classes')
		.where('class_id', req.body.class_id)
		.first();
	if (!theClass) {
		next({
			status: 400,
			message: 'Class does not exist'
		});
	} else {
		if (theClass['max_class_size'] <= theClass['current_class_size']) {
			next({
				status: 400,
				message: 'Sorry, the class is full'
			});
		} else {
			next();
		}
	}
}

function checkIfReservationExists(req, res, next) {
	const { user_id, class_id } = req.params;

	UsersClasses.findReservation(user_id, class_id)
		.then(reservation => {
			if (!reservation) {
				next({
					status: 400,
					message: 'Cannot find Reservation to be canceled'
				});
			} else {
				next();
			}
		})
		.catch(next);
}

module.exports = {
	only,
	restricted,
	checkUsernameExists,
	checkUserExistsById,
	checkIfAlreadyEnrolled,
	checkIfClassHasSpace,
	checkUsernameUnique,
	validateCredentials,
	validateAuthLevel,
	validateClassInfo,
	validateTypeId,
	checkIfReservationExists,
	logger
};
