const router = require('express').Router();
const UserClasses = require('./user-class-model');
const Classes = require('../classes/class-model');
const {
	only,
	checkIfAlreadyEnrolled,
	checkIfClassHasSpace,
	checkUserExistsById,
	checkIfReservationExists
} = require('../middleware/index');

// get all Class reservations, ordered by class id
router.get('/', only, (req, res, next) => {
	UserClasses.getAllClassesWithAttendance()
		.then(classList => {
			res.status(200).json(classList);
		})
		.catch(next);
});

// get all Class reservations of a certain user, ordered by date
// need restrictions for Only their own classes?
router.get('/:user_id', (req, res, next) => {
	UserClasses.getClassesByUser(req.params.user_id)
		.then(classList => {
			res.status(200).json(classList);
		})
		.catch(next);
});

//  client can reserve a spot in a class // GOOD, but NEEDS RESTRICTIONS
// 1. not already enrolled - checkIfAlreadyEnrolled
// 2. check if user exists - checkIfUserExists
// 3. update class attendance
router.post(
	'/',
	checkUserExistsById,
	checkIfClassHasSpace,
	checkIfAlreadyEnrolled,
	(req, res, next) => {
		const { user_id, class_id } = req.body;
		UserClasses.reserveSpotInClass({ user_id, class_id })
			.then(updatedClass => {
				res.status(200).json({
					message: 'Spot Reserved',
					updatedClass: updatedClass
				});
			})
			.catch(next);
	}
);

//  Client can remove a reservation in a class FOR THEMSELVES (not yet, ?), OR
// Instructor can remove any client from any class
router.delete(
	'/:user_id/:class_id',
	checkUserExistsById,
	checkIfReservationExists,
	(req, res, next) => {
		const { user_id, class_id } = req.params;
		UserClasses.removeUserReservation(user_id, class_id)
			.then(theClass => {
				Classes.updateClass(class_id, {
					current_class_size: (theClass.current_class_size -= 1)
				})
					.then(updatedClass => {
						res.status(200).json({
							message: 'Reserved Cancelled',
							updatedClass: updatedClass
						});
					})
					.catch(next);
			})
			.catch(next);
	}
);

module.exports = router;
