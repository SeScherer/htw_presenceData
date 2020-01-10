const attendanceStorage = require('../storage/attendanceStorage');

const getAttendances = async (from, to) => {
    return attendanceStorage.getAttendances(from, to);
};

module.exports = {
    getAttendances
};
