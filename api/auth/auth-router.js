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
		const rounds = process.env.BCRYPT_ROUNDS || 8;
		const hash = bcrypt.hashSync(user.password, rounds);
		user.password = hash;

		// add user to the db
		Users.addUser(user)
			.then(newUser => {
				res.status(200).json({
					message: 'New User created',
					newUser: {
						user_id: newUser[0].user_id,
						username: newUser[0].username,
						role: newUser[0].role_id === 2 ? 'instructor' : 'client'
					}
				});
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
		const { username, password } = req.user;
		const { user_id, role_name } = req.validUser;

		// check if password is correct
		if (bcrypt.compareSync(password, req.validUser.password)) {
			const token = tokenBuilder({
				user_id,
				username,
				role_name
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
