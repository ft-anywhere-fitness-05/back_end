exports.seed = function (knex) {
	return knex('users').insert([
		{
			username: 'Michael',
			password:
				'$2a$06$LDSvLwkgy3cGHv4lm7R5Suf8O4zch7.fsTzf6qcVPpeouSgh8ZdWu',
			role_id: 2
		},
		{
			username: 'Josh',
			password:
				'$2a$06$LDSvLwkgy3cGHv4lm7R5Suf8O4zch7.fsTzf6qcVPpeouSgh8ZdWu',
			role_id: 2
		},
		{
			username: 'Chris',
			password:
				'$2a$06$LDSvLwkgy3cGHv4lm7R5Suf8O4zch7.fsTzf6qcVPpeouSgh8ZdWu',
			role_id: 2
		},
		{
			username: 'Daniel',
			password:
				'$2a$06$LDSvLwkgy3cGHv4lm7R5Suf8O4zch7.fsTzf6qcVPpeouSgh8ZdWu',
			role_id: 2
		},
		{
			username: 'Biff',
			password:
				'$2a$06$LDSvLwkgy3cGHv4lm7R5Suf8O4zch7.fsTzf6qcVPpeouSgh8ZdWu',
			role_id: 1
		}
	]);
};
