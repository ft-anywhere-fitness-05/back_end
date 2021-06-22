const router = require('express').Router();
const UserClasses = require('./user-class-model');
const {restricted, only,}=require('../middleware/index')
//  client can reserve a spot in a class // GOOD, but NEEDS RESTRICTIONS
router.post('/',restricted, (req, res, next) => {
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

//  Client can reserve a spot in a class FOR THEMSELVES, OR
// Instructor can remove any client from any class
// GOOD, but NEEDS RESTRICTIONS
router.delete('/:user_id/:class_id',restricted, only, (req, res, next) => {
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
