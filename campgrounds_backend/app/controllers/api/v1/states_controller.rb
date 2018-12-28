class Api::V1::StatesController < ApplicationController
  skip_before_action :authorized

  def index
    states = ApiService.getStates
    render json: states, status: :ok
  end

end #end StatesController class
