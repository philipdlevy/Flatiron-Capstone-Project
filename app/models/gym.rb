class Gym < ApplicationRecord
    has_many :trainers

    has_many :gym_memberships
    has_many :users, through: :gym_memberships
end
