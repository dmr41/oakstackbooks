
var https = require('https');
var qs = require('querystring');
var url = 'www.biblio.com';
var searchPath = '/api/product_search';
var pageNumber = 1;
var finalBookArray = [];

// Creates a full search path with query values set and returns a string
function pathBuilder(searchPath, pageNumber) {
  var query = biblioQueryURIBuilder(pageNumber);
  var fullPath = (searchPath + "?" + query);
  return fullPath;
} // end pathBuilder

// Builds query string from queryObject
function biblioQueryURIBuilder(pageNumber){
  var queryString = "";
  var queryObject = {       //
    author: 'chad harbach', // Single field first and/or last name
    results_per_page: 50,  // Biblio api record limit per page
    minimum_price: 10,      // In dollars by default
    page: pageNumber        // Page number for multi-page responses
  };
  queryString = qs.stringify(queryObject); // converts queryObject to string
  return queryString;
} //end biblioQueryURIBuilder

/* Takes array of book objects and puts then into finalBookArray.
   Then makes callback to getRequestAndResponse for next page of data
*/
function bookResultBuilder(parsedArray, getRequestCallback) {
    console.log("parsedArray: " + parsedArray.length);
    for(var k = 0; k < parsedArray.length; ++k) {  // use an enum instead!!!!!
      finalBookArray.push(parsedArray[k]);
    }
    getRequestCallback;
    console.log("finalArray " + finalBookArray.length);
    return finalBookArray;
} // end bookResultBuilder

// Builds options Object to be passed to https get request
function httpsOptions(currentPageNumber) {
  var options = {
    hostname: url,
    headers: {'X-API-KEY': process.env.BIBLIO_USER_KEY}, // ENV var USER_KEY
    path: pathBuilder(searchPath, currentPageNumber),
    method: 'GET',
    json: true
  };
  return options;
} // end httpsOptions


function getRequestAndResponse(currentPageNumber) {
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
        bookResultBuilder(parsedArray, getRequestAndResponse(nextPage));
      }
      else {
      }
    });
  });
} // end getRequestAndResponse

getRequestAndResponse(pageNumber);
