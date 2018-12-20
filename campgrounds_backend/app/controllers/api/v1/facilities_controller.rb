class Api::V1::FacilitiesController < ApplicationController
  def index
    # this route is for checking the return json only - the getFacilities method has a default abbrev value of NY - the frontend should only be hitting the create route since the search would provide a state abbreviation - remove later
    facilities = ApiService.getFacilities
    render json: facilities, status: :ok
  end

  def create
    facilities = ApiService.getFacilities(facilities_params[:abbrev])
    render json: facilities, status: :ok
  end

  private
  def facilities_params
    params.require(:facility).permit(:abbrev)
  end

end #end FacilitiesController class
