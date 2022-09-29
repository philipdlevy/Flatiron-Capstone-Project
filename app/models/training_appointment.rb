class TrainingAppointment < ApplicationRecord
    validates :date, :time, presence: true

    belongs_to :user
    belongs_to :trainer
end
