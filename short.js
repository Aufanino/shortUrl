
var url = require('url'),
    express = require('express'),
    short = require('short'),
    app = express.createServer(),
    port = process.env.PORT || 8080;

short.connect("mongodb://localhost/short");

app.get('/api/*', function (req, res) {
  if (req.url === '/favicon.ico') {
    return;
  }
  var removeApi = req.url.slice(5),
      URL = removeApi;
  short.gen(URL, function (error, shortURL) {
    if (error) {
      console.error(error);
    } 
    else {
      var URL = shortURL.URL;
      var hash = shortURL.hash;
      var tiny_url = "http://127.0.0.1:" + port + "/" + hash;
      console.log("URL is " + URL + " " + tiny_url);
      res.end(tiny_url);
    }
  });
});

app.get('*', function (req, res) {
  if (req.url === '/favicon.ico') {
    return;
  }
  var hash = req.url.slice(1);
  short.get(hash, function (error, shortURLObject) {
    if (error) {console.error(error);
    } 
    else {
      if (shortURLObject) {
        res.redirect(shortURLObject[0].URL);
      } 
      else {
        res.send('URL not found!', 404);
        res.end();
      }
    }
  });
});

app.listen(port, function () {
  console.log('Server running on port ' + port);
});

/* EOF */