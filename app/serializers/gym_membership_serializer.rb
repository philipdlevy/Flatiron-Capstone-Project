class GymMembershipSerializer < ActiveModel::Serializer
  attributes :id, :price

  belongs_to :gym
  belongs_to :user
end
