class Trainer < ApplicationRecord
    belongs_to :gym

    has_many :training_appointments
    has_many :users, through: :training_appointments
end
