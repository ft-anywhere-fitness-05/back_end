exports.seed = function (knex) {
	return knex('types').insert([
		{
			type_name: 'yoga'
		},
		{
			type_name: 'dance'
		},
		{
			type_name: 'HIIT'
		},
		{
			type_name: 'full body fusion'
		},
		{
			type_name: 'circuit training'
		},
		{
			type_name: 'water aerobics'
		},
		{
			type_name: 'cycling'
		},
		{
			type_name: 'bootcamp'
		},
		{
			type_name: 'conditioning'
		},
		{
			type_name: 'MMA'
		}
	]);
};
