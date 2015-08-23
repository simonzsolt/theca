// ====================MAIN DEPENDENCIESS====================

var express = require('express'); // server dep
    app = express(), // initializing app

    path = require('path'),
    http = require('http'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    
    bodyParser = require('body-parser')

// ====================LOADING CONFIG VARS====================

//  mongoose
var mongoose = require('mongoose');
var models = require('./public/models/thecaModels'); 

// ====================SERVER INIT====================

// -------------------PORT AND IP-------------------

// for local
var port = (process.env.OPENSHIFT_NODEJS_PORT   || 3000);
var ip   = (process.env.OPENSHIFT_NODEJS_IP     || '127.0.0.1');

// -------------------DB CONNECTION-------------------

//LOCAL MONGODB

mongoose.connect("mongodb://localhost/theca", function(err) {
    if (err) {
        console.log('DB connection error:' + err);
    }
    else {return;}
});

// -------------------SERVER LISTENING-------------------

var server = app.listen(port, ip, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
}); // debug for port and ip binding

var routes = require('./routes/index');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// ====================MIDDLEWARE====================

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(logger('dev')); // morgan logger
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// for reaching public directory without stating 'public/'
app.use(express.static(path.join(__dirname, 'public'))); 

app.use('/', routes); 

// ====================EXPORTING APP====================

module.exports = app; 