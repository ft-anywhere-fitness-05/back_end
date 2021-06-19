const router = require('express').Router();
const { checkRole, restricted } = require('../middleware');
const Users = require('./users-model');

router.get('/', restricted, checkRole('admin'), (req, res, next) => {
	Users.find()
		.then(users => {
			res.json(users);
		})
		.catch(next); // our custom err handling middleware in server.js will trap this
});

module.exports = router;
