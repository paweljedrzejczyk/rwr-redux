module ReactWebpackRails
  module ReduxIntegration
    module ReduxElements
      class Base
        def initialize(name, base_options, path = nil)
          @element_name = name
          @store_name = base_options[:store_name]
          @server_side = base_options[:server_side]
          @base_options = base_options
          @path = path
        end

        def payload
          { name: element_name, storeName: store_name }
        end

        def options
          base_options.except(:store_name, :server_side)
        end

        private

        attr_reader :element_name, :store_name, :server_side, :base_options, :path

        def node_integration(integration_name)
          NodeIntegrationRunner.new(integration_name, payload).run
        end
      end
    end
  end
end
