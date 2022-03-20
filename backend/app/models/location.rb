class Location < ApplicationRecord

  has_many :comments
  has_many :users, through: :favourie_locations


end
