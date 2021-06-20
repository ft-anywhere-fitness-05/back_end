exports.seed = function (knex) {
	return knex('user-classes').insert([
		{
			username: 'Josh'
		},
		{
			username: 'Chris'
		},
		{
			username: 'Daniel'
		}
	]);
};
