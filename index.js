var express = require('express')
var app = express()
var dotenv = require('dotenv')
dotenv.load()
var Forecast = require('forecast')

var port = process.env.PORT || 3000

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.static(__dirname + '/public'))


// WEATHER
var currently = {}
var forecast = new Forecast({
  service: 'darksky',
  key: process.env.DARKSKY_API_KEY,
  units: 'fahrenheit',
  cache: true,      // Cache API requests
  ttl: {            // How long to cache requests. Uses syntax from moment.js: http://momentjs.com/docs/#/durations/creating/
    minutes: 27,
    seconds: 45
  }
})

// Retrieve weather information from coordinates (Denver, CO)
forecast.get([39.7392, 104.9903], function(err, weather) {
  if(err) return console.dir(err)
  currently = weather.currently
});


var captureComplete = function () {
  console.log('Capture complete.')
}

var exec = require('child_process').exec
var cmd = './js/libs/phantomjs-2.1.1-macosx/bin/phantomjs js/phantom-capture.js'
var cmdStats = './js/libs/phantomjs-2.1.1-macosx/bin/phantomjs js/w3cbrowserstats.js'

exec(cmdStats, function(error, stdout, stderr, callback) {
  // function to run once capture is complete
  captureComplete();
})

// EXPRESS SERVER
app.listen(port, function () {
  console.log('Server started on port ' + port + '.')
})

app.get('/', function (req, res) {
    res.render('index.jade',
  	{ current: currently.temperature }
  )
})
