class CreateUserReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :user_reviews do |t|
      t.references :user
      t.references :reviewer
      t.string :comment

      t.timestamps
    end
  end
end
