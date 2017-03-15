'use strict';

var express = require('express');
var app = express();

// set port
app.set('port', (process.env.PORT || 8080));

// serve index.html on no route
app.use(express.static(__dirname));

// otherwise, collect date and try to parse it
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

app.listen(app.get('port'), function () {
  console.log('App is running on port ' + app.get('port') + '!');
});