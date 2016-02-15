module ReactWebpackRails
  module ReduxIntegration
    module ViewHelpers
      def redux_store(name, raw_props = {}, options = {})
        react_element('redux-store', { name: name, props: serialize_props(raw_props) }, options)
      end

      def redux_container(name, options = {})
        store_name = options.delete(:store_name)
        react_element('redux-container', { name: name, storeName: store_name }, options)
      end

      private

      def serialize_props(raw_props)
        props = raw_props.as_json
        return props unless Rails.application.config.react.camelize_props
        ReactWebpackRails::Services::CamelizeKeys.call(props)
      end
    end
  end
end
