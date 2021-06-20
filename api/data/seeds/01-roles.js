exports.seed = function (knex) {
	return knex('roles').insert([
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
