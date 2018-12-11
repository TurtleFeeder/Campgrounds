class Api::V1::FacilitiesController < ApplicationController
  def index
    facilities = Api.getFacilities
    render json: facilities, status: :ok
  end

end #end FacilitiesController class
