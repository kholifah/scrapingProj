var express = require('express');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var app = express();
var port = 8000;

var url = "http://www.indeed.com/cmp/Fuze-Lab/jobs/Entry-Junior-PHP-Jquery-MySQL-Coder-Team-Member-01790db21236725e";

request(url, function(err, resp, body) {
  var $ = cheerio.load(body);
  var companyName = $('.company');
  var companyNameText = companyName.text();
  var location = $('.location');
  var summary = $('#job_summary p');
  var summaryText = summary.text().substr(0, 100);

  var jobTitle = $('.jobtitle font');
  var jobTitleText = jobTitle.text();

  var job = {
    jobTitle: jobTitleText,
    companyName: companyNameText
  }

  $('.company').filter(function() {
        var data = $(this);
        data1 = data.text()
      })
  // console.log(job);
  console.log(summaryText);
});

app.listen(port);
console.log('server is listening on ' + port);

