require 'rails_helper'

feature 'user_can_see_counter_component', js: true do
  before { visit redux_container_path }

  it 'renders counter app with the initial state from controller' do
    expect(page).to have_content('Clicked: 17 times', count: 2)
  end

  it 'synchronizes state between counter apps' do
    within('#first-counter-app') do
      find('button', text: '+').click
      expect(page).to have_content('Clicked: 18 times')
    end

    within('#second-counter-app') do
      expect(page).to have_content('Clicked: 18 times')
    end
  end
end
