const db = require('../../api/data/dbConfig');

const findAll = () => {
	return db('users');
};

const findBy = filter => {
	return db('users').where(filter).first();
};

const findById = id => {
	return db('users').where({ id }).first();
};

async function addUser({ username, password }) {
	const [user_id] = await db('users').insert({
		username: username,
		password: password
	});
	return findById(user_id);
}

async function removeUser(id) {
	const userToBeDeleted = await findById(id);
	await db('users').where({ id }).del();
	return userToBeDeleted;
}

module.exports = { findAll, findBy, findById, addUser, removeUser };
