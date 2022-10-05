class Exercise < ApplicationRecord
    validates :name, :info, :image_url, presence: true
    validates :info, length: {minimum: 10, maximum: 350}
end
