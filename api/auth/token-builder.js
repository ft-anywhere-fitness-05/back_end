const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../secrets');
const Users = require('../users/users-model')
module.exports = async function ( {username}) {
	const [getRole] = await Users.getUserRole(username)
		const {user_id,role_name} =getRole
		
	const payload = {
		subject:user_id,
		username: username,
		role: role_name
	};
	const options = {
		expiresIn: '1d'
	};
	return jwt.sign(payload, JWT_SECRET, options);
};
