
	// document.body.onload = addTableRowElement;

var https = require('https');
var qs = require('querystring');
var url = 'www.biblio.com';
var searchPath = '/api/product_search';
var pageNumber = 1;
var finalBookArray = [];

function pathBuilder(searchPath, pageNumber) {
  var query = biblioQueryURIBuilder(pageNumber);
  var fullPath = (searchPath + "?" + query);
  return fullPath;
}

function biblioQueryURIBuilder(pageNumber){
  var queryString = "";
  var queryObject = {
    author: 'chad harbach',
    results_per_page: 50,
    minimum_price: 10,
    page: pageNumber
  };
  queryString = qs.stringify(queryObject);
  return queryString;
}

function bookResultBuilder(parsedArray, nextPage) {
    for(var k = 0; k < parsedArray.length; ++k) {
      finalBookArray.push(parsedArray[k]);
    }
    getRequestAndResponse(nextPage, finalBookArray);
}
// var queryString = qs.stringify({ 'author': 'chad harbach','results_per_page': '199','minimum_price':'10','page': '1' }); // 199 is api limit per page
function httpsOptions(currentPageNumber) {
  var options = {
    hostname: url,
    headers: {'X-API-KEY': process.env.BIBLIO_USER_KEY}, //set local env var USER_KEY
    path: pathBuilder(searchPath, currentPageNumber),
    method: 'GET',
    json: true
  };
    return options;
}


function getRequestAndResponse(currentPageNumber, finalBookArray) {
  pathBuilder(searchPath, currentPageNumber);
  https.get(httpsOptions(currentPageNumber), function(res) {
    var body = "";
    res.on('data', function(accumulate) {
      body += accumulate;
    });
    res.on('end', function() {
      var parsedBody = JSON.parse(body);
      var parsedArray = parsedBody.data.results;
      var currentPage = parseInt(parsedBody.data.meta.page);
      var lastPage = parseInt(parsedBody.data.meta.pages);
      if (currentPage <= lastPage) {
        var nextPage = currentPage + 1;
        bookResultBuilder(parsedArray, nextPage);
      }
      else {
        console.log(finalBookArray);
      }
      // console.log(finalBookArray)
    });

  });
  return finalBookArray;
}
console.log(getRequestAndResponse(pageNumber, finalBookArray));

// console.log(final);
