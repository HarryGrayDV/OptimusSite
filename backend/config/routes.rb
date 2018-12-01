Rails.application.routes.draw do
  constraints format: :json do
    resources :buttons, only: [:index, :create]
    scope :models do
      get '/mobile', to: 'models#mobile'
      get '/web', to: 'models#web'
    end
  end
end
