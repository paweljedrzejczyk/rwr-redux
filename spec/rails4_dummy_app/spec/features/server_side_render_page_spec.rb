require 'rails_helper'

feature 'server_side_render page', js: true do
  it 'renders components with the initial state from controller' do
    visit server_side_render_path
    expect(page).to have_content('Clicked: 33 times', count: 2)
  end

  context 'on route change' do
    context 'when standard page' do
      before do
        visit server_side_render_path
        first('button', text: '+').click
        find("a[href='/server_side_render/about']").click
      end

      it 'renders sub route' do
        expect(current_path).to eq('/server_side_render/about')
        expect(page).to have_content('Clicked: 33 times', count: 2)
        expect(page).to have_content('About component inside RouterApp')
      end
    end

    context 'when redirect route' do
      before { visit server_side_render_path + '/redirect' }

      it 'redirects to new route' do
        expect(current_path).to eq('/server_side_render')
      end
    end

    context 'when missing route' do
      it 'throws 404 RoutingError' do
        visit server_side_render_path + '/error'
        expect { visit server_side_render_path + '/error' }.
          to raise_error.with_message(/ReactWebpackRails::ReduxIntegration: No route found/)
      end
    end
  end
end
