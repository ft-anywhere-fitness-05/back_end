const router = require('express').Router();
const Classes = require('./class-model');

// get a list of all the Classes
router.get('/', (req, res, next) => {
	Classes.findAllClasses()
		.then(classes => {
			res.json(classes);
		})
		.catch(next);
});

// search for a class by class_id
router.get('/:class_id', (req, res, next) => {
	Classes.findClassById(req.params.class_id)
		.then(singleClass => {
			res.json(singleClass);
		})
		.catch(next);
});

// instructor can create a class // GOOD but NEEDS RESTRICTIONS
router.post('/', (req, res, next) => {
	Classes.addClass(req.body)
		.then(newClass => {
			res.status(200).json({
				message: 'Class created',
				updatedClass: newClass[0]
			});
		})
		.catch(next);
});

// instructor can change/update a class // GOOD but NEEDS RESTRICTIONS
router.patch('/:class_id', (req, res, next) => {
	Classes.updateClass(req.params.class_id, req.body)
		.then(updatedClass => {
			res.status(201).json({
				message: 'Class updated',
				updatedClass: updatedClass
			});
		})
		.catch(next);
});

// instructor can delete a class // GOOD but NEEDS RESTRICTIONS
router.delete('/:class_id', (req, res, next) => {
	Classes.removeClass(req.params.class_id)
		.then(removedClass => {
			res.status(200).json({
				message: 'Class removed',
				removedClass: removedClass
			});
		})
		.catch(next);
});

module.exports = router;
