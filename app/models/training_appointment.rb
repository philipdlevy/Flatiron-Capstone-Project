class TrainingAppointment < ApplicationRecord
    validates :date_time, presence: true, uniqueness: true

    belongs_to :user
    belongs_to :trainer
end
