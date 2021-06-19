exports.up = function (knex) {
	return knex.schema
		.createTable('users', tbl => {
			tbl.increments('user_id');
			tbl.text('username', 128).unique().notNullable();
			tbl.text('password').notNullable();
		})
		.createTable('classes', tbl => {
			tbl.increments('class_id');
			tbl.text('class_name').unique().notNullable();
			// 	tbl.integer('columnTitle2')
			// 		.unsigned() // can't do negative
			// 		.notNullable()
			// 		.references('usersID')
			// 		.inTable('users')
			// 		.onUpdate('CASCADE')
			// 		.onDelete('CASCADE'); // or RESTRICT
		});
};

exports.down = function (knex) {
	return knex.schema
		.dropTableIfExists('tableName2')
		.dropTableIfExists('users');
};
