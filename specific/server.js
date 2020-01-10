require('dotenv').config();
const expressHandlebars = require('express-handlebars'),
    bodyParser = require('body-parser'),
    routing = require('./routes'),
    session = require('express-session'),
    express = require('express');

const port = process.env.PORT;

const server = express();

server.set('views', './specific/views');
server.set('view engine', 'handlebars');
server.set('defaultLayout', null);
server.engine('handlebars', expressHandlebars());

server.use(
    bodyParser.urlencoded({
        extended: false
    })
);
server.use(bodyParser.json());
server.use(express.static('./specific/public'));
server.use(
    session({
        secret: process.env.SESSION_SECRET || 'DEFAULT_session_SECRET_not_SET',
        resave: false,
        saveUninitialized: true
    })
);
server.use((req, res, next) => {
    res.locals.__PAGENAME__ = 'PresenceDater';
    if (req.session) {
        res.locals.__IS_LOGGED_IN__ = req.session.isLoggedIn;
        res.locals.__USER__ = req.session.user;
    }

    next();
});

server.use('/', routing);

server.listen(port, () => {
    console.log('Server listening at port ' + port);
});
