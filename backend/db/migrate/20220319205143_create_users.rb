class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :name
      t.string :email_address
      t.string :password_digest
      t.date :birthday
      t.string :image_url
      t.string :instagram_handle
      t.string :twitter_handle
      t.string :tiktok_handle
      t.string :personal_link
      t.string :summary

      t.timestamps
    end
  end
end
