// ====================MAIN DEPENDENCIESS====================

var express = require('express'); // server dep
    app = express(), // initializing app

    path = require('path'),
    http = require('http'),
    passport = require('passport'),
    localStrategy = require('passport-local').Strategy,
    passportLocalMongoose = require('passport-local-mongoose'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    
    bodyParser = require('body-parser'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    flash = require('connect-flash'),

    MongoStore = require('connect-mongo')(session);

// ====================LOADING CONFIG VARS====================

//  mongoose
var mongoose = require('mongoose');
var models = require('./public/models/thecaModel'); 

// ====================SERVER INIT====================

// -------------------PORT AND IP-------------------

// for dev and prod
var port = (process.env.PORT || '3333');

// -------------------DB CONNECTION-------------------

const db = mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}, function(err) {
    if (err) {
        console.log('DB connection error:' + err);
        throw err
    }
});

// -------------------SERVER LISTENING-------------------

var server = app.listen(port, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at port: ' + port);
}); // debug for port and ip binding

var routes = require('./routes/index');
var auth = require('./routes/auth');
var search = require('./routes/search');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// ====================MIDDLEWARE====================

app.use(logger('dev')); // morgan logger
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
        secret: process.env.SECRET,
        resave: true,
        saveUninitialized: false,
        store: new MongoStore({
            mongooseConnection: db,
            url: process.env.MONGODB_URI
    })
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

// add Schema
var Account = require('./public/models/usersModels'); 
// use localStrategy and authenticate function
passport.use(new localStrategy(Account.authenticate()));
// passport.use(Account.createStrategy());

// serializing based on Shcema
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// for reaching public directory without stating 'public/'
app.use(express.static(path.join(__dirname, 'public'))); 

app.use('/', routes); 
app.use('/', auth); 
app.use('/', search); 

// ====================EXPORTING APP====================

module.exports = app; 
