// dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var logger = require('morgan');
var mongoose = require('mongoose');
// Notice: Our scraping tools are prepared, too
var request = require('request');
var cheerio = require('cheerio');
//Controllers
var app_controller = require('./controllers/app_controller');

app.use(methodOverride('_method'));
// use morgan and bodyparser with our app
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}));

// make public a static dir
app.use(express.static('public'));

app.use('/', app_controller);

// Database configuration with mongoose
mongoose.connect('mongodb://localhost/storyScraper');
var db = mongoose.connection;

// show any mongoose errors
db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});

// once logged in to the db through mongoose, log a success message
db.once('open', function() {
  console.log('Mongoose connection successful.');
});

module.exports = app;
