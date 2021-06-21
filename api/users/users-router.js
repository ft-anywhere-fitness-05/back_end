const router = require('express').Router();
const { restricted, only } = require('../middleware');
const Users = require('./users-model');

// Instructors can get a list of all the users
// router.get('/', restricted, checkRole('admin'), (req, res, next) => {
router.get('/', (req, res, next) => {
	Users.findAllUsers()
		.then(users => {
			res.json(users);
		})
		.catch(next);
});

// Instructors can get a specific user
// router.get('/:id', restricted, checkRole('admin'), (req, res, next) => {
router.get('/:user_id', (req, res, next) => {
	Users.findUserById(req.params.user_id)
		.then(user => {
			res.status(200).json(user);
		})
		.catch(next);
});

module.exports = router;
