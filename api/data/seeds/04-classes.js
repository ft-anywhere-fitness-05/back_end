exports.seed = function (knex) {
	return knex('classes').insert([
		{
			class_name: ' hot spin',
			class_description:
				'Stationary bike class in a heated room. Consult you doctor.',
			location: 'Arlen',
			date: '2021-07-05',
			start_time: '13:00:00',
			duration: '00:30:00',
			intensity: 5,
			max_class_size: 5,
			current_class_size: 3,
			type_id: 7
		},
		{
			class_name: 'hot yoga',
			class_description:
				'Yoga class in a heated room. Consult you doctor.',
			location: 'Springwood',
			date: '2021-07-05',
			start_time: '13:00:00',
			duration: '00:30:00',
			intensity: 4,
			max_class_size: 5,
			current_class_size: 1,
			type_id: 1
		},
		{
			class_name: 'hip hop dance',
			class_description:
				'Dancing in the hip hop style in a heated room. Consult you doctor. Also, I think our air conditioner is broken',
			location: 'Arlen',
			date: '2021-07-05',
			start_time: '13:00:00',
			duration: '00:30:00',
			intensity: 3,
			max_class_size: 2,
			current_class_size: 2,
			type_id: 2
		}
	]);
};
