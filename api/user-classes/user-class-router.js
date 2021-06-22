const router = require('express').Router();
const UserClasses = require('./user-class-model');
const { only } = require('../middleware/index');

//  client can reserve a spot in a class // GOOD, but NEEDS RESTRICTIONS
router.post('/', only, (req, res, next) => {
	const { user_id, class_id } = req.body;
	UserClasses.reserveSpotInClass({ user_id, class_id })
		.then(updatedClass => {
			res.status(200).json({
				message: 'Spot Reserved',
				updatedClass: updatedClass
			});
		})
		.catch(next);
});

//  Client can remove a reservation in a class FOR THEMSELVES, OR
// Instructor can remove any client from any class
// GOOD, but NEEDS RESTRICTIONS
router.delete('/:user_id/:class_id', only, (req, res, next) => {
	const { user_id, class_id } = req.params;
	UserClasses.removeUserReservation(user_id, class_id)
		.then(updatedClass => {
			res.status(200).json({
				message: 'Reserved Cancelled',
				updatedClass: updatedClass
			});
		})
		.catch(next);
});

module.exports = router;
