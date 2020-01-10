const logout = (req, res) => {
    if(req.session){
        req.session.isLoggedIn = false
    }
    res.redirect('/login')
};

module.exports={logout}