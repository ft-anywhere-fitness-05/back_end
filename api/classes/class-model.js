const db = require('../../api/data/dbConfig');

const findAllClasses = () => {
	return db('classes');
};

function findClassBy(filter) {
	return db('classes as c')
		.join('types as t', 'c.type_id', 't.type_id')
		.orderBy(`${filter}`, 'asc');
}

function findClassByType(type) {
	return db('classes as c')
		.join('types as t', 'c.type_id', 't.type_id')
		.where('type_name', type);
}

const findClassById = class_id => {
	return db('classes').where({ class_id }).first();
};

function updateClass(class_id, updates) {
	return db('classes')
		.where('class_id', class_id)
		.update(updates)
		.then(() => {
			return findClassById(class_id);
		});
}

async function addClass(newClass) {
	return db('classes').insert(newClass, [
		'class_id',
		'class_name',
		'class_description',
		'location',
		'date',
		'start_time',
		'duration',
		'intensity',
		'max_class_size',
		'current_class_size',
		'type_id'
	]);
}

function reserveSpotInClass(reservation) {
	return db('user_class_id').insert(reservation, ['user_id', 'class_id']);
}

async function removeClass(class_id) {
	const classToBeDeleted = await findClassById(class_id);
	await db('classes').where('class_id', class_id).del();
	return classToBeDeleted;
}

module.exports = {
	findAllClasses,
	findClassBy,
	findClassById,
	findClassByType,
	updateClass,
	addClass,
	reserveSpotInClass,
	removeClass
};
