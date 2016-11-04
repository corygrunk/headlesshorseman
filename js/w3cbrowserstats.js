var page = require('webpage').create();
var w = 700;
var h = 330;
//viewportSize being the actual size of the headless browser
page.viewportSize = { width: w, height: h };
//the clipRect is the portion of the page you are taking a screenshot of
page.clipRect = { top: 220, left: 0, width: w, height: h };
//the rest of the code is the same as the previous example
page.open('https://www.w3counter.com/globalstats.php', function() {
  page.render('public/captures/stats.png');
  phantom.exit();
});
