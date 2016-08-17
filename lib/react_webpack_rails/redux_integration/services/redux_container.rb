require 'react_webpack_rails/redux_integration/services/redux_element'

module ReactWebpackRails
  module ReduxIntegration
    module Services
      class ReduxContainer < ReduxElement
        def result
          super
        end

        def payload
          { name: element_name, props: props, storeName: store_name }
        end

        def options
          super
        end

        private

        def empty_result
          { 'body' => '' }
        end
      end
    end
  end
end
