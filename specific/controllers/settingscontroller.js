const render = (req, res) => {
    res.render('settings', {
        layout: false,
        __HEADING__: 'Settings',
        __SETTINGS_ACTIVE__: true
    });
};
module.exports = { render };
