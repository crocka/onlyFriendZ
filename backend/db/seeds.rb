# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
puts "Seeding Data ..."

# Only run on development (local) instances not on production, etc.
unless Rails.env.development?
  puts "Development seeds only (for now)!"
  exit 0
end

# Let's do this ...

## CATEGORIES

puts "Finding or Creating Users ..."

user1 = User.find_or_create_by! ({
  
  name: 'Apparel',
  email_address: 'apparel@example.com',
  password: 'password123',
  password_confirmation: 'password123',
  birthday: '',
  image_url: 'http://example.com',
  summary: ''
  
  })

puts "Finding or Creating Locations ..."

location1 = Location.find_or_create_by! ({
  title: 'McDonalds',
  description: 'Burger joint',
  latitude: 1.123456,
  longitude: 2.123456,

})

## Comment

Comment.destroy_all

location1.comments.create!({
  comments: 'Great place to eat',
  rating: 5
})

##favourite_locations

FavouriteLocation.destroy_all

user1.favorite_locations.create!({

  
})




puts "DONE!"
