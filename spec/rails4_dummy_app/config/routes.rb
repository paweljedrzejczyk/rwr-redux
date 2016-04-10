Rails.application.routes.draw do
  get 'redux_container', to: 'pages#redux_container'
  get 'redux_router', to: 'pages#redux_router'
  get 'redux_router/*path', to: 'pages#redux_router'
end
