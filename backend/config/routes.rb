Rails.application.routes.draw do
  resources :comments
  resources :user_reviews
  resources :favourite_locations
  resources :users
  resources :locations
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
