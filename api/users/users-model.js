const db = require('../../api/data/dbConfig');

const findAllUsers = () => {
	return db('users').select('user_id', 'username');
};

const findUserBy = filter => {
	return db('users as u')
		.join('roles as r', 'u.role_id', 'r.role_id')
		.where(filter)
		.first();
};

const findUserById = user_id => {
	return db('users')
		.select('user_id', 'username', 'role_id')
		.where({ user_id })
		.first();
};

async function addUser(user) {
	return db('users').insert(user, ['user_id', 'username', 'role_id']);
}

async function removeUser(user_id) {
	const userToBeDeleted = await findUserById(user_id);
	await db('users').where({ user_id }).del();
	return userToBeDeleted;
}
async function getUserRole(username) {
	const rows = await db('users as u').leftJoin('roles as r',"u.role_id","r.role_id").where("username",username)
	return rows;
}
async function onBoarding(user_id){
	const rows = db("users").where("user_id",user_id).select("user_id","username","on_boarding")
	return rows
}
async function setOnboarding(user,user_id){
	const{ob} = user
	const [userx] = await onBoarding(user_id)///finding full details about user
	const returnObj={
		...userx,
		on_boarding:user.on_boarding
		
	}
	await db("users").update(returnObj).where("user_id",user_id)
	return returnObj
}
module.exports = {
	findAllUsers,
	findUserBy,
	findUserById,
	addUser,
	removeUser,
	getUserRole,
	onBoarding,
	setOnboarding
};
