const attandanceStorage = require('../storage/attendanceStorage');

const create = async (attandance, userid) => {
    let createdAttandance = await attandanceStorage.createAttendance({
        ...attandance,
        user_id: userid
    });

    return createdAttandance;
};

module.exports = { create };
