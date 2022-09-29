class User < ApplicationRecord
    has_secure_password

    validates :username, :email, uniqueness: true, presence: true
    validates :age, :address, presence: true

    belongs_to :role

    has_many :training_appointments, dependent: :destroy
    has_many :trainers, through: :training_appointments

    has_one :gym_membership, dependent: :destroy
    has_one :gym, through: :gym_membership
end
