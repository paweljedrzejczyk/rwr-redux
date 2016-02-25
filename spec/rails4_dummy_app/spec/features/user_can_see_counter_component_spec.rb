require 'rails_helper'

feature 'user_can_see_counter_component', js: true do
  before { visit counter_path }

  it 'renders counter app with the initial state from controller' do
    expect(page).to have_content('Clicked: 17 times')
  end

  it 'renders devTools with the initial state from controller' do
    expect(page).to have_content('state:{} 1 key')
    expect(page).to have_content('counter:17')
  end

  it 'synchronizes state between counter app and devTools' do
    find('button', text: '+').click

    expect(page).to have_content('Clicked: 18 times')
    expect(page).to have_content('counter:18')
  end
end
