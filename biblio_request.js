
var https = require('https');
var qs = require('querystring');

function BookRequest(url, path) {
	this.url = url;
	this.searchPath = path;
	this.pageNumber = 1;
	this.finalBookArray = [];
}
BookRequest.prototype = {
	get requestURL() {
		return this.url;
	},
  set requestURL(url) {
    this.url = url;
  },
  get requestPath() {
    return this.searchPath;
  },
  set requestPath(searchPath) {
    this.searchPath = searchPath;
  },
  get requestPage() {
    return this.pageNumber;
  },
  set requestPage(page) {
    this.pageNumber = page;
  },
  get bookArray() {
      return this.finalBookArray;
  },
  set bookArray(finalBookArray) {
      this.finalBookArray = finalBookArray;
  },
}
// build complete URI then make API request
function getRequest(currentpg, searchPath, exitValue) {
  pathBuilder(searchPath, currentpg);
  dataRequest(currentpg, exitValue);
  } // end getRequest

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

// This is the actual request called from getRequest function
function dataRequest(currentPage, exitValue) {
  https.get(httpsOptions(currentPage), function(res) {
    var body = "";
    res.on('data', function(accumulate) {
      body += accumulate;
    });
    res.on('end', function() {
      var parsedBody = JSON.parse(body);
      var parsedArray = parsedBody.data.results;
      var thisPage = parseInt(parsedBody.data.meta.page);
      var lastPage = parseInt(parsedBody.data.meta.pages);
      if (thisPage <= lastPage) {
        var nextPage = thisPage + 1;
        bookResultBuilder(parsedArray, getRequest(nextPage, searchPath, exitValue));
      }
      else {
        exitRequest(exitValue);
        return true;
      }
    });
  });
} // end dataRequest

// Builds options Object to be passed to https get request
function httpsOptions(currentPage) {
  var options = {
    hostname: newReq.requestURL,
    headers: {'X-API-KEY': process.env.BIBLIO_USER_KEY}, // ENV var USER_KEY
    path: pathBuilder(newReq.requestPath, currentPage),
    method: 'GET',
    json: true
  };
  return options;
} // end httpsOptions

/* Takes array of book objects and puts then into finalBookArray.
   Then makes callback to getRequestAndResponse for next page of data
*/
function bookResultBuilder(parsedArray, getRequestCallback) {
    for(var k = 0; k < parsedArray.length; ++k) {  // use an enum instead!!!!!
      newReq.bookArray.push(parsedArray[k]);
    }
    getRequestCallback;
    return true;
} // end bookResultBuilder

// finale Book Array data from search
function exitRequest(value) {
  console.log(value());
  console.log(value().length);
} // end exitRequest

  var newReq = new BookRequest('www.biblio.com','/api/product_search');
  var currentpg = newReq.requestPage;
  var searchPath = newReq.requestPath;
  var finalValue = function() {
    return newReq.bookArray;
  }

getRequest(currentpg, searchPath, finalValue);
