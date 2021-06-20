exports.up = function (knex) {
	return knex.schema
		.createTable('roles', roles => {
			roles.increments('role_id');
			roles.string('role_name', 128).unique().notNullable();
		})
		.createTable('types', types => {
			types.increments('type_id');
			types.string('type_name', 128).unique().notNullable();
		})
		.createTable('users', users => {
			users.increments('user_id');
			users.string('username', 128).unique().notNullable();
			users.string('password').notNullable();
			users
				.integer('role_id')
				.unsigned()
				.notNullable()
				.references('role_id')
				.inTable('roles')
				.onDelete('RESTRICT')
				.onUpdate('RESTRICT');
		})
		.createTable('classes', classes => {
			classes.increments('class_id');
			classes.string('class_name').notNullable();
			classes.text('class_description');
			classes.string('location').notNullable();
			classes.date('date').notNullable(); // YYYY-MM-DD
			classes.time('start_time').notNullable(); // hh:mm:ss[.nnnnnnn]
			classes.time('duration').defaultTo('00:30:00').notNullable(); // hh:mm:ss[.nnnnnnn]
			classes.integer('intensity').defaultTo('1').notNullable();
			classes.integer('max_class_size').defaultTo('5').notNullable();
			classes.integer('current_class_size').defaultTo('0').notNullable();
			classes
				.integer('type_id')
				.unsigned()
				.notNullable()
				.references('type_id')
				.inTable('types')
				.onDelete('RESTRICT')
				.onUpdate('RESTRICT');
		})
		.createTable('user_classes', user_classes => {
			user_classes.increments('user_class_id');
			user_classes
				.integer('user_id')
				.unsigned()
				.notNullable()
				.references('user_id')
				.inTable('users')
				.onDelete('RESTRICT')
				.onUpdate('RESTRICT');
			user_classes
				.integer('class_id')
				.unsigned()
				.notNullable()
				.references('class_id')
				.inTable('classes')
				.onDelete('RESTRICT')
				.onUpdate('RESTRICT');
		});
};

exports.down = function (knex) {
	return knex.schema
		.dropTableIfExists('user_classes')
		.dropTableIfExists('classes')
		.dropTableIfExists('users')
		.dropTableIfExists('types')
		.dropTableIfExists('roles');
};
