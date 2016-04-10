class PagesController < ApplicationController
  def redux_container
    @counter_initial_value = 17
  end

  def redux_router
    @counter_initial_value = 91
  end
end
