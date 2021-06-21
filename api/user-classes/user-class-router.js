const router = require('express').Router();
const UserClasses = require('./user-class-model');

//  client can reserve a spot in a class // NOT READY, NEEDS RESTRICTIONS
router.post('/', (req, res, next) => {
	const { user_id, class_id } = req.body;
	UserClasses.reserveSpotInClass(user_id, class_id)
		.then(updatedClass => {
			res.status(200).json({
				message: 'Spot Reserved',
				updatedClass: updatedClass
			});
		})
		.catch(next);
});

router.delete('/:user_id/:class_id', (req, res, next) => {
	const { user_id, class_id } = req.params;
	UserClasses.removeUserReservation(user_id, class_id)
		.then(updatedClass => {
			req.status(200).json({
				message: 'Reserved Cancelled',
				updatedClass: updatedClass
			});
		})
		.catch(next);
});

module.exports = router;
