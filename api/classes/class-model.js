const db = require('../../api/data/dbConfig');

const findAllClasses = () => {
	return db('classes');
};

const findClassBy = filter => {
	return db('classes').where(filter);
};

// not working yet
const findClassByType = type => {
	return db('classes as c')
		.leftJoin('types as t', 'c.type_id', 't.type_id')
		.where('t.type_name', type);
};

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

async function addClass({
	name,
	start_time,
	duration,
	intensity_level,
	location,
	current_num_of_registered_attendees,
	max_class_size
}) {
	const [class_id] = await db('classes').insert({
		name,
		start_time,
		duration,
		intensity_level,
		location,
		current_num_of_registered_attendees,
		max_class_size
	});
	return findClassById(class_id);
}

async function removeClass(class_id) {
	const classToBeDeleted = await findClassById(class_id);
	await db('classes').where('class_id', class_id).del();
	return classToBeDeleted;
}

module.exports = {
	findAllClasses,
	findClassBy,
	findClassByType,
	findClassById,
	updateClass,
	addClass,
	removeClass
};
