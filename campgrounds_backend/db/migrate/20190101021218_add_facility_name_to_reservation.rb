class AddFacilityNameToReservation < ActiveRecord::Migration[5.2]
  def change
    add_column :reservations, :facility_name, :string
  end
end
