class CreateUserReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :user_reviews do |t|
      t.integer :reviewer_id
      t.integer :user_id
      t.string :comment

      t.timestamps
    end
  end
end
