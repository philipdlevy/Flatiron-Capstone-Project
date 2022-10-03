class TrainingAppointment < ApplicationRecord
    validates :date_time, presence: true

    belongs_to :user
    belongs_to :trainer
end
