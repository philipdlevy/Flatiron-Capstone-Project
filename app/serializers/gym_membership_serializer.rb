require 'pry'

class GymMembershipSerializer < ActiveModel::Serializer
  attributes :id, :price, :membershipType, :gym

  belongs_to :gym
  # belongs_to :user

  def gym
    usersGym = self.object.gym
  end
end
