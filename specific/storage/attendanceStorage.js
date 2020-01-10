const knex = require('knex')(require('../../knexfile'));

const ATTENDANCE_FIELDS = ['id', 'user_id', 'date', 'arrival', 'departure'];
const ATTENDANCE_TABLE = 'attendance';

const insert = async attendance =>
    knex
        .insert(attendance)
        .into(ATTENDANCE_TABLE)
        .returning('id')
        .then(id => {
            console.log(id);
            return getById(id[0]);
        });

const getById = async id =>
    knex(ATTENDANCE_TABLE)
        .first(...ATTENDANCE_FIELDS)
        .where({ id });

const createAttendance = async attendance => {
    const insertResult = await insert(attendance);
    console.log(insertResult);
    return { insertResult };
};

const getAttendances = async (from, to) =>
    knex(ATTENDANCE_TABLE)
        .select()
        .whereBetween('date', [from, to]);

module.exports = {
    createAttendance,
    getAttendances
};
