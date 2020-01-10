const knex = require('knex')(require('../../knexfile'));

const USER_FIELDS = ['id', 'username', 'firstName', 'lastName'];
const USER_TABLE = 'user';
const insert = async user =>
    knex
        .insert(user)
        .into(USER_TABLE)
        .then(() => getByUsername(user.username));

const getByUsername = async username =>
    knex(USER_TABLE)
        .select(...USER_FIELDS)
        .where({ username });

const getFirstByUsername = async username =>
    knex(USER_TABLE)
        .first(...USER_FIELDS, 'password')
        .where({ username });

const doesUserAlreadyExists = async username => {
    const user = await getByUsername(username);
    return user.length > 0;
};

const getById = async id =>
    knex(USER_TABLE)
        .first(...USER_FIELDS)
        .where({ id });

const deleteById = async id =>
    knex(USER_TABLE)
        .delete()
        .where({ id });

const getAll = async () => knex(USER_TABLE).select(...USER_FIELDS);

const createUser = async user => {
    const promise_doesUserAlreadyExists = doesUserAlreadyExists(user.username);
    if (await promise_doesUserAlreadyExists) {
        throw new Error(`User "${user.username}" already exists`);
    }
    const insertResult = await insert(user);
    return {
        ...insertResult[0]
    };
};

const usernameExistsElsewhere = (id, username) =>
    knex(USER_TABLE)
        .select('id')
        .where({ username })
        .andWhereNot({ id })
        .then(result => result.length > 0);

const update = (id, values) =>
    knex(USER_TABLE)
        .update(values)
        .where({ id });

module.exports = {
    createUser,
    getById,
    getFirstByUsername,
    getAll,
    deleteById,
    update,
    usernameExistsElsewhere
};
