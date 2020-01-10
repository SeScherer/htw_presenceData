const auth = (req, res, next) => {
    if (req.session && req.session.isLoggedIn === true && req.session.user) {
        console.log('User is logged in');
        next();
    } else {
        console.log('User is not logged in - Access denied');
        res.status(401);
        res.render('notAuthorized', {
            layout: false,
            __HEADING__: 'Not Authorized'
        });
    }
};

module.exports = auth;
