'use strict';

var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hey you! Send me a date and I\'ll give you the timestamp!');
});

app.get('/:date', (req, res) => {
    let validDate = true;
    const date = new Date();
    const unixTime = parseInt(req.params.date);
    if (unixTime) {
        // it's unix time!
        date.setTime(unixTime * 1000);
    } else {
        // it's a string date, hopefully
        const processString = req.params.date.split('%20').join(' ');
        const parsedDate = new Date(processString);
        if (parsedDate.getTime()) {
            date.setTime(parsedDate.getTime());
        } else {
            validDate = false;
        }
    }
    const dateObj = {};
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    if (validDate) {
        dateObj.unix = date.getTime() / 1000;
        dateObj.natural = date.toLocaleDateString('en-US', options);
    } else {
        dateObj.unix = null;
        dateObj.natural = null;
    }
    res.send(dateObj);
    
});

app.listen(8080, function () {
  console.log('Listening on port 8080!');
});