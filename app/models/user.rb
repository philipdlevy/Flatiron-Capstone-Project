class User < ApplicationRecord
    has_one :role

    has_many :training_appointments
    has_many :trainers, through: :training_appointments

    has_one :gym_membership
    has_one :gym, through: :gym_memberships
end
