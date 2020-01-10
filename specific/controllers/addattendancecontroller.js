const overviewController = require('../controllers/overviewController');
const attandanceService = require('../services/attendanceservice');

const render = (req, res) => {
    res.render('addattendance', {
        layout: false,
        __HEADING__: 'add attendance',
        __ADDATTENDANCE_ACTIVE__: true
    });
};
const create = (req, res) => {
    attandanceService
        .create(req.body, req.session.user.id)
        .then(result => {
            res.status(200);
            res.json(result);
        })
        .catch(error => {
            res.status(400);
            res.end('Error: ' + error.message);
        });
};

module.exports = { render, create };
