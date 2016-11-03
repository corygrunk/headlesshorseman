var page = require('webpage').create();
var w = 600;
var h = 600;
//viewportSize being the actual size of the headless browser
page.viewportSize = { width: w, height: h };
//the clipRect is the portion of the page you are taking a screenshot of
page.clipRect = { top: 0, left: 0, width: w, height: h };
//the rest of the code is the same as the previous example
page.open('http://localhost:3000/', function() {
  page.render('public/captures/capture.png');
  phantom.exit();
});
