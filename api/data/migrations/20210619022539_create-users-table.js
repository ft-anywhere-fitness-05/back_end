exports.up = function (knex) {
	return knex.schema
		.createTable('users', users => {
			users.increments('user_id');
			users.text('username', 128).unique().notNullable();
			users.text('password').notNullable();
			users.text('auth_level').notNullable(); // client or instructor
		})
		.createTable('classes', classes => {
			classes.increments('class_id');
			classes.text('name').unique().notNullable();
			classes.text('type');
			classes.text('start_time');
			classes.text('duration');
			classes.text('intensity_level');
			classes.text('location');
			classes.text('current_num_of_registered_attendees');
			classes.text('max_class_size');
		});
};

exports.down = function (knex) {
	return knex.schema.dropTableIfExists('classes').dropTableIfExists('users');
};
