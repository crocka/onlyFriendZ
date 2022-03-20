class AddReferencesToFavouriteLocations < ActiveRecord::Migration[5.2]
  def change
    add_reference :favourite_locations, :user, index: true, foreign_key: true
    add_reference :favourite_locations, :location, index: true, foreign_key: true
  end
end
