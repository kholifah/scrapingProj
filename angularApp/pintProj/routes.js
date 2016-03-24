var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var express = require('express');
var router = express.Router();
var Item = require('./models/Item.model');


/* GET home page. */
// router.get('/test', function(req, res) {
//   res.send('hello from /api/test' );
// });

router.post('/scrape', function(req, res) {
  var url = req.body.url;

  if (url.indexOf("pinterest") > -1) {
    request(url, function(error, resp, body) {
      console.log(url);

      if (error) {
        console.log('error scraping ');
      }

      if (!error) {
        // get ready for scraping
        var $ = cheerio.load(body);
        var pin = {};
        var $url = url;
        var img = $("meta[itemprop = 'image']").get(1);
        var $img = $(img).attr('content');
        var $desc = $("meta[itemprop = 'text']").attr('content');

        // Finding the bits on the page we care about based on class names
        var pin = {
          img: $img,
          url: $url,
          desc: $desc
        }

        // respond with the final json
        console.log("scraped: ", pin);
        res.json(pin);
      }
    });
  } else {
    console.log('cannot locate scraper');
  }
});



module.exports = router;