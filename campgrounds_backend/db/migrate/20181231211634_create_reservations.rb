class CreateReservations < ActiveRecord::Migration[5.2]
  def change
    create_table :reservations do |t|
      t.integer :user_id
      t.integer :facility_id
      t.date :start_dt
      t.date :end_dt
      t.string :activities

      t.timestamps
    end
  end
end
