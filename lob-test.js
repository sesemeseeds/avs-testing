var https = require('follow-redirects').https;
var fs = require('fs');

var qs = require('querystring');

var options = {
  'method': 'POST',
  'hostname': 'api.lob.com',
  'path': '/v1/us_verifications?case=upper',
  'headers': {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic bGl2ZV9wdWJfNWI0YmQzMDhkMDBhNTVkMzU3MDBiYmI0YzdlM2Y2Mjo='
  },
  'maxRedirects': 20
};

var req = https.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function (chunk) {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });

  res.on("error", function (error) {
    console.error(error);
  });
});

var postData = qs.stringify({
  'primary_line': '2900 reading road',
  'city': 'cincinnati',
  'state': 'ohio',
  'zip_code': '45219'
});

req.write(postData);

req.end();