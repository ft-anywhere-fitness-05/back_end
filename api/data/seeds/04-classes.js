exports.seed = function (knex) {
	return knex('classes').insert([
		{
			class_name: 'Hot Spin',
			class_description:
				'Stationary bike class in a heated room. Consult you doctor.',
			location: '7116 Oxford St. Pawtucket, RI 02860',
			date: '2021-07-05',
			start_time: '14:00:00',
			duration: '00:30:00',
			intensity: '5',
			max_class_size: '5',
			current_class_size: '3',
			type_id: '7'
		},
		{
			class_name: 'Hot Yoga',
			class_description:
				'Yoga class in a heated room. Consult you doctor.',
			location: '18 W. Marsh Road Franklin Square, NY 11010',
			date: '2021-07-05',
			start_time: '13:00:00',
			duration: '00:30:00',
			intensity: '4',
			max_class_size: '5',
			current_class_size: '1',
			type_id: '1'
		},
		{
			class_name: 'Hip Hop Dance',
			class_description:
				'Dancing in the hip hop style in a heated room. Consult you doctor. Also, I think our air conditioner is broken',
			location: '797 Pin Oak St. Morrisville, PA 19067',
			date: '2021-07-05',
			start_time: '15:00:00',
			duration: '00:30:00',
			intensity: '3',
			max_class_size: '2',
			current_class_size: '2',
			type_id: '2'
		},
		{
			class_name: 'Water-Robics',
			class_description:
				'Water aerobics class in a freezing cold pool. Consult you doctor.',
			location: '8653 Edgefield Street Wake Forest, NC 27587',
			date: '2021-11-05',
			start_time: '10:00:00',
			duration: '00:45:00',
			intensity: '2',
			max_class_size: '7',
			current_class_size: '0',
			type_id: '6'
		},
		{
			class_name: 'Kickboxing',
			class_description:
				'Kickboxing in a heated room. Consult you doctor.',
			location: '396 Wood St. Trumbull, CT 06611',
			date: '2021-07-05',
			start_time: '20:30:00',
			duration: '00:40:00',
			intensity: '9',
			max_class_size: '5',
			current_class_size: '0',
			type_id: '10'
		},
		{
			class_name: 'Fusion Fitness',
			class_description:
				'Total body toning class in a heated room. Consult you doctor.',
			location: '9806 Corona St. Fairmont, WV 26554',
			date: '2021-09-01',
			start_time: '09:00:00',
			duration: '01:00:00',
			intensity: '7',
			max_class_size: '10',
			current_class_size: '0',
			type_id: '4'
		}
	]);
};
