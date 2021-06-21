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
router.get('/:user_id', (req, res, next) => {
	Users.findUserById(req.params.user_id)
		.then(user => {
			res.status(200).json(user);
		})
		.catch(next);
});

// can update a user's info ONLY IF INSTRUCTOR, NOT FINISHED
// router.get('/:id', restricted, checkRole('admin'), (req, res, next) => {
router.patch('/:user_id', (req, res, next) => {});

module.exports = router;
