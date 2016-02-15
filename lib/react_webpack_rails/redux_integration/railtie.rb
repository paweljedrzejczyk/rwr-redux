require 'react_webpack_rails/redux_integration/view_helpers'

module ReactWebpackRails
  module ReduxIntegration
    class Railtie < ::Rails::Railtie
      initializer 'react_webpack_rails.redux_helpers.view_helpers' do
        ActionView::Base.send :include, ViewHelpers
      end
    end
  end
end
