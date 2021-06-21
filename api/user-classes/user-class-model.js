const db = require('../../api/data/dbConfig');

function reserveSpotInClass(reservation) {
	return db('user_class_id').insert(reservation, ['user_id', 'class_id']);
}

module.exports = {
	reserveSpotInClass
};
