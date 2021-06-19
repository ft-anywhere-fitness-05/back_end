exports.seed = function (knex) {
	return knex('classes').insert([
		{ class_name: 'spin' },
		{ class_name: 'hot_yoga' },
		{ class_name: 'hip_hop_dance' }
	]);
};
