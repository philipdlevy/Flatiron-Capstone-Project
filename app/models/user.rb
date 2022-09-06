class User < ApplicationRecord
    has_secure_password

    validates :username, uniqueness: true, presence: true

    belongs_to :role

    has_many :training_appointments
    has_many :trainers, through: :training_appointments

    has_one :gym_membership
    has_one :gym, through: :gym_membership
end
