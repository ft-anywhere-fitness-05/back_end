const db = require('../../api/data/dbConfig');

function findReservation(user_id, class_id) {
	return db('user_classes')
		.where('user_id', user_id)
		.where('class_id', class_id);
}

async function reserveSpotInClass(reservation) {
	await db('user_classes').insert(reservation, ['user_id', 'class_id']);
	return db('classes').where('class_id', class_id);
}

async function removeUserReservation(user_id, class_id) {
	// const reservationToBeDeleted = await findReservation(user_id, class_id)
	await db('user_classes')
		.where('user_id', user_id)
		.where('class_id', class_id)
		.del();
	return db('classes').where('class_id', class_id).first();
}

module.exports = {
	findReservation,
	reserveSpotInClass,
	removeUserReservation
};
