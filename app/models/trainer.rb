class Trainer < ApplicationRecord
    belongs_to :gym

    validates :name, :bio, :email, presence: true
    validates :email, uniqueness: true
    validates :bio, length: {minimum: 100, maximum: 250}

    has_many :training_appointments, dependent: :destroy
    has_many :users, through: :training_appointments
end
