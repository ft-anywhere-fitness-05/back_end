const router = require('express').Router();
const { only } = require('../middleware');
const Users = require('./users-model');

// DONE

// Instructors can get a list of all the users and their classes
router.get('/', only, (req, res, next) => {
	Users.findAllUsers()
		.then(users => {
			res.json(users);
		})
		.catch(next);
});

// Instructors can get a specific user
router.get('/:user_id', only, (req, res, next) => {
	Users.findUserById(req.params.user_id)
		.then(user => {
			res.status(200).json(user);
		})
		.catch(next);
});

module.exports = router;
