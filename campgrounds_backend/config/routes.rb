Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :facilities
      resources :states, only: [:index]
      resources :users, only: [:index, :create]
      post '/login', to: 'auth#create'
    end
  end
end
