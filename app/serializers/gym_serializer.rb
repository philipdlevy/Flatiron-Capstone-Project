class GymSerializer < ActiveModel::Serializer
  attributes :id, :address, :phone_number

  has_many :trainers
  has_many :gym_memberships
  has_many :users, through: :gym_memberships
end
