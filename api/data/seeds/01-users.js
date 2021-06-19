exports.seed = function (knex) {
	return knex('users').insert([
		{
			username: 'Josh',
			password:
				'$2a$06$LDSvLwkgy3cGHv4lm7R5Suf8O4zch7.fsTzf6qcVPpeouSgh8ZdWu',
			auth_level: 'instructor'
		},
		{
			username: 'Chris',
			password:
				'$2a$06$LDSvLwkgy3cGHv4lm7R5Suf8O4zch7.fsTzf6qcVPpeouSgh8ZdWu',
			auth_level: 'instructor'
		},
		{
			username: 'Daniel',
			password:
				'$2a$06$LDSvLwkgy3cGHv4lm7R5Suf8O4zch7.fsTzf6qcVPpeouSgh8ZdWu',
			auth_level: 'instructor'
		}
	]);
};
