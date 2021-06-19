exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex('users')
		.del()
		.then(function () {
			// Inserts seed entries
			return knex('users').insert([
				{ user_id: 1, username: 'Biff', password: 'password' },
				{ user_id: 2, username: 'Marty', password: 'password' },
				{ user_id: 3, username: 'DocBrown', password: 'password' }
			]);
		});
};
