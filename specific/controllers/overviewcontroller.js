const testdata = require('../testdata.json'),
    weekService = require('../services/weekservice'),
    overviewService = require('../services/overviewservice');

const render = async (req, res) => {
    const weekDates = weekService.getCurrentWeek();
    let attendances = await overviewService.getAttendances(
        '1000-01-01',
        '3000-01-01'
    );
    console.log(attendances);
    res.render('overview', {
        layout: false,
        __HEADING__: 'Overview',
        __OVERVIEW_ACTIVE__: true,
        __ATTENDANCES__: testdata,
        __FIRST_DATE__: weekService.getDate(weekDates[0]),
        __LAST_DATE__: weekService.getDate(weekDates[6])
    });
};

module.exports = { render };
