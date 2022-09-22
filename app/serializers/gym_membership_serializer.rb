require 'pry'

class GymMembershipSerializer < ActiveModel::Serializer
  attributes :id, :price, :gym

  belongs_to :gym
  # belongs_to :user

  def gym
    # binding.pry
    usersGym = self.object.gym
  end
end
