exports.seed = function (knex) {
	return knex('types').insert([
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
