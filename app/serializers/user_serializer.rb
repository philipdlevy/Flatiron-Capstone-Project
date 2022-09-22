require 'pry'

class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :age, :email, :address

  belongs_to :role

  has_many :training_appointments
  # has_many :trainers, through: :training_appointments

  has_one :gym_membership
  # has_one :gym, through: :gym_membership

  # def trainers 
  #   # binding.pry
  #   trainers = object.trainers.uniq
  # end
end


