const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const helmet = require('helmet');
const passport = require('../auth/passport');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const sessionConfig = require('../config/session');

module.exports = function (app) {
    //View engine setup
    app.set('views', path.join(__dirname, '../views'));
    app.engine('.hbs', exphbs({ defaultLayout: 'layout', extname: '.hbs', helpers: {
            //global.email is updated in passport strategy methods and displayed in profile dropdown menu
            email: function () { return global.email; },
            //Used this hdnlerbars helper method to display first letter of email in uppercase on profile menu
            firstLetter: function () {
                if (global.email) {
                    return global.email.substring(0, 1).toUpperCase();
                }
                return "";
            }
        } }));
    app.set('view engine', '.hbs');
    app.enable('view cache');

    app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));
    // app.use(logger('dev'));
    app.use(cookieParser('my other secret string'));

    const sessionStore = new MongoDBStore({
        uri: 'mongodb://' + sessionConfig.host + ":" + sessionConfig.port + "/" + sessionConfig.databaseName,
        databaseName: sessionConfig.databaseName,
        collection: sessionConfig.collection
    });

    sessionStore.on('error', function (err) {
        console.error(err);
    })

    app.use(session({
        secret: 'my other secret string',
        name: 'framework_session',
        store: sessionStore,
        resave: true,
        saveUninitialized: true,
        cookie: {
            secure: false,
            maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
        }
    }));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(helmet());

    var options = {
        dotfiles: 'ignore',
        extensions: ['htm', 'html'],
        index: false
    };
    app.use(express.static(path.join(__dirname, '../public'), options));

    var pp = passport(app);

    app.use(require('../policies')());

    require('../routes')(app, pp);

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handler
    app.use(function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
        // render the error page        
        res.render('./errors/error', err);
    });

    return app;
}