class CreateLocations < ActiveRecord::Migration[5.2]
  def change
    create_table :locations do |t|
      t.string :title
      t.string :description
      t.float :latitude
      t.float :longitude
      t.integer :rating
      t.boolean :is_dangerous

      t.timestamps
    end
  end
end
