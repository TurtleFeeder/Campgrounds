module ApiService
  def self.getFacilities
    base_url = 'https://ridb.recreation.gov/api/v1/facilities'
    query_url = '?query=camping&limit=50&offset=0&full=true&activity=CAMPING&lastupdated=10-01-2018&state='
    state = 'NY'
    full_url = base_url + query_url + state
    header = {accept: "application/json", apikey: ENV['API_KEY']}
    response = RestClient.get(full_url, header)
    facilities = JSON.parse(response)['RECDATA']
    facilities.map do |facility|
      # map over facilities array and parse only the FacilityDescription attribute that's a string of html tags & text. returns the whole facility object for the facilities control to render out.
      facility['FacilityDescription'] = Nokogiri::HTML.parse(facility['FacilityDescription']).text
      facility
    end
  end

end
