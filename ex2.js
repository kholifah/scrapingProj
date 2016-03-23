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
	var companyName =$('.company');
	var companyNameText = companyName.text();

	var jobTitle = $('.jobtitle font');
	var jobTitleText = jobTitle.text();

	var location = $('.location');
	var locationText = location.text();

	var summary = $('#job_summary p');
	var summaryText = summary.text();

	var job = {
		jobTitle: jobTitleText,
		location: locationText,
		companyName: companyNameText,
		summary: summaryText
	};

	// console.log(job);
if(err) {
	console.log(err);
}else {
	console.log(job);
}

});


app.listen(port);
console.log('server is listenig on '+ port);