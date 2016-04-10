require 'rails_helper'

feature 'redux_router page', js: true do
  before { visit redux_router_path }

  it 'renders RouterApp and Counter component with initial state from controller' do
    expect(page).to have_content('Clicked: 91 times')
    expect(page).to have_css('a', text: 'About')
  end

  it 'change page with sync state' do
    find('button', text: '+').click
    expect(page).to have_content('Clicked: 92 times')

    find("a[href='/redux_router/about']").click

    expect(page).to have_content('Clicked: 92 times')
    expect(page).to have_content('About component inside RouterApp')
  end
end
