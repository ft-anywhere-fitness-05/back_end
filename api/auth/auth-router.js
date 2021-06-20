const bcrypt = require('bcryptjs');
const router = require('express').Router();
const tokenBuilder = require('./token-builder');
const Users = require('../users/users-model.js');

const {
	checkUsernameExists,
	validateCredentials,
	checkUsernameUnique,
	validateAuthLevel
} = require('../middleware/index');

// REGISTER new user
router.post(
	'/register',
	validateCredentials,
	checkUsernameUnique,
	validateAuthLevel,
	async (req, res, next) => {
		let user = req.user;

		// encrypt the password
		const rounds = process.env.BCRYPT_ROUNDS || 6;
		const hash = bcrypt.hashSync(user.password, rounds);
		user.password = hash;
		console.log(hash);

		console.log('USER to Register: ', user);
		// add user to the db
		Users.addUser(user)
			.then(newUser => {
				res.status(201).json(newUser);
			})
			.catch(next);
	}
);

// LOGIN to system
router.post(
	'/login',
	validateCredentials,
	checkUsernameExists,
	(req, res, next) => {
		const { username, password, user_id } = req.body;

		// check if password is correct
		if (bcrypt.compareSync(password, req.validUser.password)) {
			const token = tokenBuilder({
				user_id,
				username
			});

			res.status(200).json({
				message: `Welcome, ${username}!`,
				token
			});
		} else {
			next({
				status: 401,
				message: 'invalid credentials'
			});
		}
	}
);

module.exports = router;
