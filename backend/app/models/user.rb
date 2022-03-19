class User < ApplicationRecord

  has_secure_password

  has_many :locations, through :favorite_locations
  has_many :user_reviews

end
