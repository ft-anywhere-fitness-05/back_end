const router = require('express').Router();
const { restricted, only } = require('../middleware');
const Types = require('./type-model');

// get a list of all the Class Types
router.get('/', (req, res, next) => {
	Types.findAllTypes()
		.then(classTypes => {
			res.status(200).json(classTypes);
		})
		.catch(next);
});

// get a list of all the Classes by type_id
router.get('/:type_id', (req, res, next) => {
	Types.findClassesByTypeId(req.params.type_id)
		.then(classesByType => {
			res.status(200).json(classesByType);
		})
		.catch(next);
});

// instructor can create a class type// GOOD but NEEDS RESTRICTIONS
router.post('/', restricted, only, (req, res, next) => {
	Types.addClassType(req.body)
		.then(newType => {
			res.status(200).json({
				message: 'Type created',
				newType: newType[0]
			});
		})
		.catch(next);
});

module.exports = router;
