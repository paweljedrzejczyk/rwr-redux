require 'react_webpack_rails/redux_integration/services/redux_element'

module ReactWebpackRails
  module ReduxIntegration
    module Services
      class ReduxRouter < ReduxElement
        def result
          super
        end

        def payload
          { name: element_name, storeName: store_name, path: path }
        end

        def options
          super
        end

        private

        def empty_result
          { 'code' => 200, 'body' => '' }
        end
      end
    end
  end
end
