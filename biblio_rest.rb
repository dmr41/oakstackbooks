
require 'rest-client'
require 'pp'
require 'json'

url =  'https://www.biblio.com/api/product_search?author=chad+harbach&title=art+of+fielding#&first_edition=true&ship_to_country=USA&currency=USD&sort_field=price&sort_direction=desc&minimum_price=50'

response = RestClient.get(
  url,

  :content_type => :json, :accept => :json, :'X-API-KEY' => "KEY HERE!!!")
puts JSON.pretty_generate(JSON.parse(response))
