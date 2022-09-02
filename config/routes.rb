Rails.application.routes.draw do
  resources :exercises, only: [:show, :index, :create, :destroy, :update]
  resources :gyms, only: [:index, :create, :destroy, :update]
  resources :roles, only: [:show, :index, :create]
  resources :trainers, only: [:show, :index, :create, :destroy, :update]
  resources :users, only: [:show, :index, :create, :destroy]
  
  resources :training_appointments, only: [:show, :index, :create, :destroy]
  resources :gym_memberships, only: [:show, :index, :create, :destroy]
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
