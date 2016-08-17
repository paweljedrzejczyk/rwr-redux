module ReactWebpackRails
  module ReduxIntegration
    module Services
      class ReduxElement
        def initialize(integration_name, element_name, base_options, path = nil)
          @integration_name = integration_name
          @element_name = element_name
          @props = base_options[:props]
          @store_name = base_options[:store_name]
          @server_side = base_options[:server_side]
          @base_options = base_options
          @path = path
        end

        def result
          return empty_result unless server_side
          JSON.parse(node_integration)
        end

        def options
          base_options.except(:props, :store_name, :server_side)
        end

        private

        attr_reader :integration_name, :element_name, :store_name, :server_side, :base_options, :path, :props

        def node_integration
          NodeIntegrationRunner.new(integration_name, payload).run
        end
      end
    end
  end
end
