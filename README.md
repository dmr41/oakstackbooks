# Oakstack Books
### Note to anyone forking project
  * An API key from [Biblio.com](www.biblio.com) is require for this project to work
  * [Instructions to request biblio API key](http://www.biblio.com/blog/2013/01/biblio-inventory-api-documentation/)


### Development basics
* Project restarted 09/19/2105
* Ruby/Rails approach scrapped -
* New approach
  * Javascript API request
  * Javascript/HTML5 frontend heavy - Framework undecided
  * MongoDB for user/data storage

### Current State
  * API call working - But early stages
  * Functions partly refactored to core API roles
  * Currently using [https](https://nodejs.org/api/all.html#all_https) and [querystring](https://www.npmjs.com/package/querystring) modules for API call

### Internal to do list
  * Ditch https and querystring for ajax and jQuery.params()
  * Build Mongo database for books result storage and user info.
  * Abstract current function better
    * i.e. var queryObject = own function
    * Create at least 2 classes:
      1. RequestURIBuildClass
      2. AjaxRequestClass
  * Once jQuery implemenation is working test HTML output
  * Add testing - jlint...selenium?
  * Consider a javascript framework Ember or Meteor
  * Design key user features and number of views
  * Sketch out a Postgres solution if MongoDB turns out to be pants
  * When it doubt refactor


### Key Goals
* Stores users personal book data
* Using the [Biblio.com API](http://www.biblio.com/blog/2013/01/biblio-inventory-api-documentation/) to get current book values

### ![Biblio image icon](https://d3525k1ryd2155.cloudfront.net/i/en/n/b_icon_30x30.png) Biblio.com API
- Build query object to search attributes such as:
  * Current sellers pricing
  * Book Condition
  * Edition
  * Signatures
