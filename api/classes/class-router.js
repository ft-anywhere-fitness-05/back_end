const router = require('express').Router();
const Classes = require('./class-model');

// admins can get a list of all the Classes
// router.get('/', checkRole('admin'), (req, res, next) => {
router.get('/', (req, res, next) => {
	Classes.findAllClasses()
		.then(classes => {
			res.json(classes);
		})
		.catch(next);
});

// admins can get a specific user
// router.get('/:id', checkRole('admin'), (req, res, next) =>
router.get('/:class_id', (req, res, next) => {
	Classes.findClassById(req.params.class_id)
		.then(ssalc => {
			console.log(ssalc);
			res.json(ssalc);
		})
		.catch(next);
});

module.exports = router;
