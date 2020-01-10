const userService = require('../services/userService');

const render = (req, res) => {
    res.render('login', {
        layout: false,
        __HEADING__: 'Login',
        __USERNAME__: req.body.username,
        __LOGIN_ACTIVE__: true,
        __LOGIN_FAILED__: req.body.loginFailed
    });
};
const recieve = (req, res) => {
    userService.verifyLogin(req.body.username, req.body.password).then(user => {
        if (user) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            res.redirect('/overview');
        } else {
            req.body.loginFailed = true;
            render(req, res);
        }
    });
};

module.exports = { render, recieve };
