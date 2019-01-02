class Api::V1::ReservationsController < ApplicationController
  skip_before_action :authorized, only: [:index]

  def index
    @reservations = Reservation.all
    render json: @reservations, status: :ok
  end

  def create
    @reservation = Reservation.create(reservation_params)
    if @reservation.valid?
      render json: @reservation, status: :created
    else
      if !!@reservation.start_dt === false
        render json: {error: 'Failed to create reservation - missing check-in date'}, status: :not_acceptable
      elsif !!@reservation.end_dt === false
        render json: {error: 'Failed to create reservation - missing check-out date'}, status: :not_acceptable
      else
        render json: {error: 'Failed to create reservation'}, status: :not_acceptable
      end
    end # end @reservation.valid? if stmt
  end # end create

  def destroy
    reservation = Reservation.find(reservation_params['id'])
    @deleted_reservation = reservation.destroy
    if !!@deleted_reservation
      render json: @deleted_reservation, status: :ok
    else
      render json: {error: 'Failed to delete reservation'}, status: :not_acceptable
    end
  end

  private

  def reservation_params
    params.require(:reservation).permit(:id, :user_id, :facility_id, :start_dt, :end_dt, :facility_name, :facility_img, :activities => [])
  end

end # end ReservationsController
