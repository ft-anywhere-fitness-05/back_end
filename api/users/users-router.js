const router = require('express').Router();
const { restricted, only } = require('../middleware');
const Users = require('./users-model');

// admins can get a list of all the users
// router.get('/', restricted, checkRole('admin'), (req, res, next) => {
router.get('/', (req, res, next) => {
	Users.findAllUsers()
		.then(users => {
			res.json(users);
		})
		.catch(next);
});

// admins can get a specific user
// router.get('/:id', restricted, checkRole('admin'), (req, res, next) => {
router.get('/:id', (req, res, next) => {
	Users.findUserById(req.params.id)
		.then(user => {
			res.status(200).json(user);
		})
		.catch(next);
});

module.exports = router;
