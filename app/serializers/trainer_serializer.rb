class TrainerSerializer < ActiveModel::Serializer
  attributes :id, :name, :bio, :email, :image_url, :users

    belongs_to :gym
    has_many :training_appointments
    # has_many :users, through: :training_appointments

    def users 
      users = object.users.uniq
    end
end
