class ApiController < ApplicationController
  protect_from_forgery with: :null_session

  def counter
    render json: { counter: rand(1..99) }
  end
end
