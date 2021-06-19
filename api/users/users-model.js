const db = require('../../api/data/dbConfig');

const findAllUsers = () => {
	return db('users');
};

const findUserBy = filter => {
	return db('users').where(filter).first();
};

const findUserById = user_id => {
	return db('users').where({ user_id }).first();
};

async function addUser({ username, password, authCode }) {
	const [user_id] = await db('users').insert({
		username: username,
		password: password,
		auth_level: authCode
	});
	return findUserById(user_id);
}

async function removeUser(user_id) {
	const userToBeDeleted = await findUserById(user_id);
	await db('users').where({ user_id }).del();
	return userToBeDeleted;
}

module.exports = {
	findAllUsers,
	findUserBy,
	findUserById,
	addUser,
	removeUser
};
