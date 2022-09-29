class Trainer < ApplicationRecord
    belongs_to :gym

    validates :name, :bio, :email, presence: true
    validates :email, uniqueness: true
    validates :bio, length: {minimum: 10, maximum: 250}

    has_many :training_appointments
    has_many :users, through: :training_appointments
end
