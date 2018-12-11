class Api < ApplicationRecord
  def self.getFacilities
    url = 'https://ridb.recreation.gov/api/v1/facilities?query=camping&limit=50&offset=0&full=true&activity=CAMPING&lastupdated=10-01-2018'
    header = {accept: "application/json", apikey: ENV[API_KEY]}
    RestClient.get(url, header)
  end
end
