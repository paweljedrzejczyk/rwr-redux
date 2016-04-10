require 'react_webpack_rails/redux_integration/services/redux_container'
require 'react_webpack_rails/redux_integration/services/redux_router'

module ReactWebpackRails
  module ReduxIntegration
    module ViewHelpers
      def redux_store(name, raw_props = {}, options = {})
        props = serialize_props(raw_props)

        if server_side(options.delete(:server_side))
          NodeIntegrationRunner.new('redux-store', name: name, props: props).run
        end

        react_element('redux-store', { name: name, props: props }, options)
      end

      def redux_container(name, options = {})
        container = Services::ReduxContainer.new('redux-container', name, options)

        react_element('redux-container', container.payload, container.options) do
          container.result['body'].html_safe
        end
      end

      def redux_router(name, options = {})
        router = Services::ReduxRouter.new('redux-router', name, options, request.path)
        result = handle_response_code(router.result, name, request.path)

        react_element('redux-router', router.payload, router.options) do
          result
        end
      end

      private

      def serialize_props(raw_props)
        props = raw_props.as_json
        return props unless Rails.application.config.react.camelize_props
        ReactWebpackRails::Services::CamelizeKeys.call(props)
      end

      def handle_response_code(result, name, path)
        case result['code']
        when 200
          result['body'].html_safe
        when 302
          controller.redirect_to(result['redirectUri'])
        else
          raise ActionController::RoutingError, routing_error(name, path)
        end
      end

      def routing_error(name, path)
        "ReactWebpackRails::ReduxIntegration: No route found in #{name} router for #{path}."
      end
    end
  end
end
