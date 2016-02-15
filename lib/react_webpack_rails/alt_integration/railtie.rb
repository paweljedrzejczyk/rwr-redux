require 'react_webpack_rails/alt_integration/view_helpers'

module ReactWebpackRails
  module AltIntegration
    class Railtie < ::Rails::Railtie
      initializer 'react_webpack_rails.alt_helpers.view_helpers' do
        ActionView::Base.send :include, ViewHelpers
      end
    end
  end
end
