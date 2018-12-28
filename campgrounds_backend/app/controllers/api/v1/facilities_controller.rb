class Api::V1::FacilitiesController < ApplicationController
  skip_before_action :authorized

  def index
    # be able to pass in stateInitials into the getFacilities method and get only facilities for that state
    facilities = ApiService.getFacilities
    render json: facilities, status: :ok
  end

  def create
    facilities = ApiService.getFacilities(facilities_params[:abbrev])
    # byebug
    render json: facilities, status: :ok
  end

  private
# will the params get passed back here to get the state entered?
  def facilities_params
    params.require(:facility).permit(:abbrev)
  end

end #end FacilitiesController class
