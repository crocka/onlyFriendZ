class CreateComments < ActiveRecord::Migration[5.2]
  def change
    create_table :comments do |t|
      t.integer :rating
      t.string :comment

      t.timestamps
    end
  end
end
