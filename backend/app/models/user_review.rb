class UserReview < ApplicationRecord

  belongs_to :user, :class_name => 'User'
  belongs_to :reviewer, :class_name => 'User'
  
end
