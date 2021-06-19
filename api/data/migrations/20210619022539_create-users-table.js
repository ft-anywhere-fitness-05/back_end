exports.up = function (knex) {
	return knex.schema
		.createTable('users', users => {
			users.increments('user_id');
			users.text('username', 128).unique().notNullable();
			users.text('password').notNullable();
		})
		.createTable('classes', classes => {
			classes.increments('class_id');
			classes.text('class_name').unique().notNullable();
		});
};

exports.down = function (knex) {
	return knex.schema.dropTableIfExists('classes').dropTableIfExists('users');
};
