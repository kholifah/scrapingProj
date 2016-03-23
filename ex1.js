var express = require('express');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var app = express();
var port = 8000;

//Example 1 
//var url = "http://google.com";
//request(url, function(err, resp, body) {
//	if(err) {
//		console.log(err);
//	}else{
//		console.log(body);
//	}
//});

//Example 2
//var destination = fs.createWriteStream('./download/google.html');
//var url = "http://google.com";
//request(url)
//	.pipe(destination);

//Example 3
var destination = fs.createWriteStream('./download/gooogle.html');
var url = "http://google.com";
request(url)
	.pipe(destination);
	destination.on('finish', function() {
		console.log('all done');
	});
//	.on('finish', function() {
//		console.log('done');
//	})
//.on('error',function(err) {
//	console.log(err);
//});

app.listen(port);
console.log('server is listenig on '+ port);
