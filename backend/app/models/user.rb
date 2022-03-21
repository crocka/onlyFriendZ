class User < ApplicationRecord

  has_secure_password

  has_many_attached :images

  validates :password, length: { minimum: 10 }

  validates :password_confirmation, presence: true

  validates :email_address, presence: true

  validates :name, presence: true

  validates :email_address, uniqueness: { case_sensitive: false }

  has_many :locations, through: :favorite_locations
  has_many :user_reviews

  def self.authenticate_with_credentials(email, password)

    user = User.where "LOWER(email_address) = '#{email.downcase}'"

    if user.first && user.first.authenticate(password)

      return user.first

    else

      return nil

    end

  end

end
