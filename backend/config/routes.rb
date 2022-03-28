Rails.application.routes.draw do
  
  root 'application#index'
  resources :users, only: [:index, :create, :show, :update, :destroy]
  resources :locations, only: [:index, :create, :show, :update, :destroy]

  scope "/user" do
    resources :favourite_locations, only: [:index, :show, :create, :destroy]
    resources :user_reviews, only: [:index, :show, :create, :destroy]
  end

  scope "/location" do
    resources :comments, only: [:index, :show, :create, :destroy]
  end

  post '/login' => 'sessions#create'
  get '/logout' => 'sessions#destroy'
  post '/locations/images/:id' => 'locations#images'
  post '/users/images/:id' => 'users#images'
  mount ActionCable.server, at: '/cable'

  # get '/users/favourite_locations/:id/:location_id' => 'favourite_locations#destroy'

  # get '/users/user_reviews/:reviewer_id' => 'user_reviews#destroy'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

