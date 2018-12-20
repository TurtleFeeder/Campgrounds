module ApiService
  def self.getFacilities(abbrev='NY')
    base_url = 'https://ridb.recreation.gov/api/v1/facilities'
    query_url = '?query=camping&limit=50&offset=0&full=true&activity=CAMPING&lastupdated=10-01-2018&state='
    state = abbrev
    full_url = base_url + query_url + state
    header = {accept: "application/json", apikey: ENV['API_KEY']}
    response = RestClient.get(full_url, header)
    facilities = JSON.parse(response)['RECDATA']
    facilities.map do |facility|
      # map over facilities array and parse only the FacilityDescription attribute that's a string of html tags & text. returns the whole facility object for the facilities control to render out.
      facility['FacilityDescription'] = Nokogiri::HTML.parse(facility['FacilityDescription']).text
      facility
    end
    # byebug
  end # end getFacilities

  def self.getStates
    states_LongLat_url = "https://gist.githubusercontent.com/meiqimichelle/7727723/raw/0109432d22f28fd1a669a3fd113e41c4193dbb5d/USstates_avg_latLong"
    states_abbrev_url = "https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_titlecase.json"

    states_abbrev = JSON.parse(RestClient.get(states_abbrev_url))
    states_with_LL = JSON.parse(RestClient.get(states_LongLat_url))

    combined_states = states_with_LL.map do |s|
      found_state = states_abbrev.find {|st| s['state'] == st['name']}
      {
        'title': s['state'],
        'abbrev': found_state['abbreviation'],
        'latitude': s['latitude'],
        'longitude': s['longitude']
      }
    end

    combined_states
  end # end getStates

end
