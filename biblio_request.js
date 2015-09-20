
var https = require('https');
var qs = require('querystring');
var url = 'www.biblio.com'
var searchPath = '/api/product_search';
var query_string = qs.stringify({ 'author': 'chad harbach',
                                  'results_per_page': '50',
                                  'minimum_price':'10',
                                  'page': '3' }
                                ); // 199 is api limit per page
var fullPath = searchPath+"?"+query_string;
var options = {
  hostname: url,
  headers: {'X-API-KEY': process.env.USER_KEY}, //set local env var USER_KEY
  path: fullPath,
  method: 'GET',
  json: true
};

https.get(options, function(res) {
  var body = "";
  res.on('data', function(accumulate) {
    body += accumulate;
  });
  res.on('end', function() {
    var parsedBody = JSON.parse(body);
   console.log(parsedBody.data.results.length);
  });
});
