var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var port = 8080;
mongoose.connect('mongodb://localhost/pintProj');

var routes = require('./routes');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', routes);

app.listen(port, function() {
  console.log('running server on port ' + port);
});