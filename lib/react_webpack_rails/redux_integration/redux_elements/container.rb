require 'react_webpack_rails/redux_integration/redux_elements/base'

module ReactWebpackRails
  module ReduxIntegration
    module ReduxElements
      class Container < Base
        def result
          return unless server_side
          json_result = node_integration('redux-container')
          JSON.parse(json_result)['body'].html_safe
        end

        def payload
          super
        end

        def options
          super
        end
      end
    end
  end
end
