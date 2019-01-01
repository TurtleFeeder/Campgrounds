class Reservation < ApplicationRecord
  belongs_to :user
  serialize :activities
  validates :start_dt, :end_dt, :facility_id, :user_id, presence: true
end
