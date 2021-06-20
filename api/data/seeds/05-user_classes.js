exports.seed = function (knex) {
	return knex('user_classes').insert([
		{
			user_id: '1',
			class_id: '1'
		}
	]);
};
