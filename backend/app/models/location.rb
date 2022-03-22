class Location < ApplicationRecord

  has_many :comments
  has_many :users, through: :favourie_locations
  has_many_attached :images


end
