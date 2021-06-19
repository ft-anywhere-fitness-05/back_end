exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex('classes')
		.del()
		.then(function () {
			// Inserts seed entries
			return knex('classes').insert([
				{ class_id: 1, class_name: 'spin' },
				{ class_id: 2, class_name: 'hot_yoga' },
				{ class_id: 3, class_name: 'hip_hop_dance' }
			]);
		});
};
