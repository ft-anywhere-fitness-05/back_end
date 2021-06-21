const db = require('../../api/data/dbConfig');

const findAllTypes = () => {
	return db('types');
};

// get type property, say name
const findClassesByTypeId = type_id => {
	return db('types as t')
		.join('classes as c', 't.type_id', 'c.type_id')
		.select('*')
		.where('c.type_id', type_id);
};

function addClassType(newType) {
	return db('types').insert(newType, ['type_id', 'type_name']);
}

module.exports = {
	findAllTypes,
	findClassesByTypeId,
	addClassType
};
