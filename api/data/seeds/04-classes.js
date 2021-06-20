exports.seed = function (knex) {
	return knex('classes').insert([
		{
			name: 'spin',
			type: 'cardio',
			start_time: '13:00',
			duration: '60',
			intensity_level: '4',
			location: 'Arlen',
			current_num_of_registered_attendees: '4',
			max_class_size: '5'
		},
		{
			name: 'hot_yoga',
			type: 'yoga',
			start_time: '14:00',
			duration: '30',
			intensity_level: '3',
			location: 'Springwood',
			current_num_of_registered_attendees: '1',
			max_class_size: '5'
		},
		{
			name: 'hip_hop_dance',
			type: 'dance',
			start_time: '15:00',
			duration: '1 hr',
			intensity_level: '2',
			location: 'Springfield',
			current_num_of_registered_attendees: '5',
			max_class_size: '5'
		}
	]);
};
