const db = require('../../api/data/dbConfig');

const findAllTypes = () => {
	return db('types');
};

const findClassesByTypeId = type_id => {
	return db('types as t')
		.join('classes as c', 't.type_id', 'c.type_id')
		.select('*')
		.where('type_id', type_id);
};

async function addType(newType) {
	return db('types').insert(newType, ['type_id', 'type_name']);
}

module.exports = {
	findAllTypes,
	findClassesByTypeId,
	addType
};
