/*
Module Dependencies
 */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var methodOverride = require('method-override');
var moment = require('moment');
var multer = require('multer');
var mongoose = require('mongoose');
// default options, no immediate parsing

//routes i.e..controllers
var home = require('./routes/home');
var image = require('./routes/image');


var app = express();

//mongodb connection
mongoose.connect('mongodb://localhost/imgApp');
mongoose.connection.on('open', function() {
    console.log('Mongoose connected.');
});



// view engine setup
var exphbs = require('express3-handlebars');
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs',exphbs.create({
    extname:'.hbs',
    defaultLayout:'main',
    layoutsDir: app.get('views') + '/layouts',
    partialsDir: [app.get('views') + '/partials'],
    helpers:{
        timeago:function(timestamp){
            return moment(timestamp).startOf('minute').fromNow();
        }
    }
}).engine);
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(multer({dest:path.join(__dirname, '/public/upload/temp')}));
app.use(cookieParser());
app.use('/public/', express.static(path.join(__dirname, 'public')));
app.use(methodOverride());

//get requests
app.get('/',home.index);
app.get('/images/:image_id',image.index);

//post requests
app.post('/images',image.create);
app.post('/images/:image_id/like',image.like);
app.post('/images/:image_id/comment',image.comment);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        //res.render('error', {
        //    message: err.message,
        //    error: err
        //});
        console.log("Error Message "+err.message);
        res.send("Error Message "+err.message);
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
