class Gym < ApplicationRecord
    has_many :trainers, dependent: :destroy

    validates :address, :phone_number, uniqueness: true, presence: true

    has_many :gym_memberships, dependent: :destroy
    has_many :users, through: :gym_memberships
end
