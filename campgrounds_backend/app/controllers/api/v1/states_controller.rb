class Api::V1::StatesController < ApplicationController
  def index
    states = ApiService.getStates
    render json: states, status: :ok
  end

end #end StatesController class
