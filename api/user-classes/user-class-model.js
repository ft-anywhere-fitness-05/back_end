const db = require('../../api/data/dbConfig');

function getAllClassesWithAttendance() {
	return db('user_classes').orderBy('class_id', 'asc');
}

function getClassesByUser(user_id) {
	return db('user_classes as uc')
		.join('classes as c', 'c.class_id', 'uc.class_id')
		.where('user_id', user_id)
		.orderBy('date', 'asc');
}

function findReservation(user_id, class_id) {
	return db('user_classes')
		.where('user_id', user_id)
		.where('class_id', class_id);
}

async function reserveSpotInClass({ user_id, class_id }) {
	await db('user_classes').insert({ user_id, class_id }, [
		'user_class_id',
		'user_id',
		'class_id'
	]);
	return db('classes').where('classes.class_id', class_id);
}

async function removeUserReservation(user_id, class_id) {
	await db('user_classes as uc')
		.where('uc.user_id', user_id)
		.where('uc.class_id', class_id)
		.del();
	return db('classes').where('classes.class_id', class_id).first();
}

module.exports = {
	getAllClassesWithAttendance,
	getClassesByUser,
	findReservation,
	reserveSpotInClass,
	removeUserReservation
};
