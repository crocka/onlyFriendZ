class CreateFavouriteLocations < ActiveRecord::Migration[5.2]
  def change
    create_table :favourite_locations do |t|
      t.integer :id
      t.integer :user_id
      t.integer :location_id

      t.timestamps
    end
  end
end
