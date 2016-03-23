var express = require('express');
var path = require('path');
var swig = require('swig');
var request = require('request');
var cheerio = require('cheerio');
var _ = require('lodash');
var bodyParser = require('body-parser');
var port = 8080;

var app = express();

app.engine('html', swig.renderFile);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  var url = "http://www.indeed.com/cmp/Fuze-Lab/jobs/Entry-Junior-PHP-Jquery-MySQL-Coder-Team-Member-01790db21236725e";

  request(url, function(err, resp, body) {
    var $ = cheerio.load(body);
    var companyName = $('.company');
    var companyNameText = companyName.text();

    var jobTitle = $('.jobtitle font');
    var jobTitleText = jobTitle.text();

    var location = $('.location');
    var locationText = location.text();

    var summary = $('#job_summary p');
    var summaryText = summary.text();

    var details = {
      jobTitle: jobTitleText,
      location: locationText,
      companyName: companyNameText,
      summary: summaryText,
      url: url
    };

    var detailsArray = _(details).toArray();

    console.log(detailsArray);
    return res.render('index', {
      jobInfo: detailsArray
    });
  });
});

app.listen(port, function() {
  console.log('running server on port ' + port);
});