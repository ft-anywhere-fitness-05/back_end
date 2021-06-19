exports.seed = function (knex) {
	return knex('users').insert([
		{ username: 'Biff', password: 'password' },
		{ username: 'Marty', password: 'password' },
		{ username: 'DocBrown', password: 'password' }
	]);
};
