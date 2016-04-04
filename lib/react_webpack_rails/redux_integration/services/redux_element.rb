module ReactWebpackRails
  module ReduxIntegration
    class Services
      class ReduxElement
        def initialize(integration_name, element_name, base_options, path = nil)
          @integration_name = integration_name
          @element_name = element_name
          @store_name = base_options[:store_name]
          @server_side = base_options[:server_side]
          @base_options = base_options
          @path = path
        end

        def result
          return unless server_side
          JSON.parse(node_integration)
        end

        def payload
          _payload = { name: element_name, storeName: store_name }
          _payload[:path] = path if path
          _payload
        end

        def options
          base_options.except(:store_name, :server_side)
        end

        private

        attr_reader :integration_name, :element_name, :store_name, :server_side, :base_options, :path

        def node_integration
          NodeIntegrationRunner.new(integration_name, payload).run
        end
      end
    end
  end
end
