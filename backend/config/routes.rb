Rails.application.routes.draw do
  constraints format: :json do
    resources :buttons, only: [:index, :create]
    resources :models, only: [:index]
  end
end
