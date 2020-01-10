const bcrypt = require('bcryptjs');
const userStorage = require('../storage/userStorage');

require('dotenv').config();

const verifyLogin = async (username, password) => {
    let user = await userStorage.getFirstByUsername(username);
    if (!user) {
        return false;
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    return passwordMatch ? user : false;
};

const create = async user =>
    userStorage.createUser({
        ...user,
        password: await bcrypt.hash(
            user.password,
            parseInt(process.env.PASSWORD_SALT_ROUNDS)
        )
    });

const getById = id => userStorage.getById(id);

const deleteById = id =>
    userStorage.deleteById(id).then(affectedRows => ({ affectedRows }));

const getAll = () => userStorage.getAll();

const update = async (
    id,
    { username, firstname: firstName, lastname: lastName, password }
) => {
    if (username) {
        if (await userStorage.usernameExistsElsewhere(id, username)) {
            const error = new Error(`User "${username}" already exists`);
            error.code = 'DUPLICATE_USERNAME';
            throw error;
        }
    }
    if (password) {
        password = await bcrypt.hash(
            password,
            parseInt(process.env.PASSWORD_SALT_ROUNDS)
        );
    }
    return userStorage
        .update(id, {
            username,
            firstName,
            lastName,
            password
        })
        .then(affectedRows => ({ affectedRows }));
};
module.exports = {
    verifyLogin,
    create,
    getById,
    getAll,
    deleteById,
    update
};
