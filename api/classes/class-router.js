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

// get a list of all the Classes by a certain Type: NOT CURRENTLY FUNCTIONAL
router.get('/type', (req, res, next) => {
	Classes.findClassByType(req.body.type)
		.then(classes => {
			res.json(classes);
		})
		.catch(next);
});

// instructor can create a class
router.post('/', (req, res, next) => {
	res.json('create working');
});

// instructor can change/update a class
router.patch('/:class_id', (req, res, next) => {
	res.json('update working');
});

// instructor can delete a class
router.delete('/', (req, res, next) => {
	res.json('delete working');
});

module.exports = router;
