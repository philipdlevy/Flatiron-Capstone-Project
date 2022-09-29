class GymMembership < ApplicationRecord
    validates :price, :membershipType, presence: true

    belongs_to :gym
    belongs_to :user
end
