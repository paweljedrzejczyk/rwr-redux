require 'rails_helper'

describe ReactWebpackRails::ReduxIntegration::ViewHelpers, type: :helper do
  describe '#redux_store' do
    let(:node_runner_class) { ReactWebpackRails::NodeIntegrationRunner }
    let(:store_args) { ['redux-store', { name: 'StoreName', props: { 'foo' => 'bar' } }] }

    it { expect(helper).to respond_to(:redux_store) }

    it 'calls #rwr_element with proper params' do
      expect(helper).to receive(:rwr_element).with(*store_args, {}).once

      helper.redux_store('StoreName', foo: 'bar')
    end

    context 'when props are not passed' do
      it 'sets an empty hash as a default' do
        expect(helper)
          .to receive(:rwr_element)
          .with('redux-store', { name: 'StoreName', props: {} }, {})
          .once

        helper.redux_store('StoreName')
      end
    end

    context 'when camelize_props is enabled' do
      before do
        allow(Rails.application.config.react)
          .to receive(:camelize_props)
          .and_return(true)
      end

      it 'calls CamelizeKeys service' do
        expect(ReactWebpackRails::Services::CamelizeKeys)
          .to receive(:call)
          .with('foo' => 'bar')
          .once

        helper.redux_store('StoreName', foo: 'bar')
      end
    end

    context 'when server_side is true' do
      let(:node_runner) { instance_double('ReactWebpackRails::NodeIntegrationRunner') }

      before do
        allow(node_runner_class).to receive(:new) { node_runner }
        allow(node_runner).to receive(:run)
      end

      it 'calls NodeIntegrationRunner instance with proper arguments' do
        expect(node_runner_class).to receive(:new).with(*store_args).and_return(node_runner).once
        expect(node_runner).to receive(:run).once

        helper.redux_store('StoreName', { foo: 'bar' }, server_side: true)
      end

      it 'calls #rwr_element with proper params' do
        expect(helper).to receive(:rwr_element).with(*store_args, {}).once

        helper.redux_store('StoreName', { foo: 'bar' }, server_side: true)
      end
    end
  end

  describe '#redux_container' do
    let(:container_name)    { 'container_name' }

    let(:redux_container_service_class) { ReactWebpackRails::ReduxIntegration::Services::ReduxContainer }
    let(:redux_container_service)       { instance_double('redux_container_service_class') }

    let(:result)  { { 'body' => 'result_body' } }
    let(:payload) { { name: container_name, storeName: 'store_name' } }

    let(:container_arguments) { ['redux-container', payload, {}] }

    before do
      allow(redux_container_service_class).to receive(:new) { redux_container_service }
      allow(redux_container_service).to receive(:result)    { result }
      allow(redux_container_service).to receive(:payload)   { payload }
      allow(redux_container_service).to receive(:options)   { {} }
    end

    it { expect(helper).to respond_to(:redux_container) }

    it 'calls #rwr_element with proper params' do
      expect(helper).to receive(:rwr_element).with(*container_arguments) do |_, &block|
        expect(block.call).to eq(result['body'].html_safe)
      end

      helper.redux_container(container_name, storeName: 'store_name')
    end
  end

  describe '#redux_router' do
    let(:router_name)    { 'router_name' }
    let(:store_name)     { 'store_name' }
    let(:path)           { '/path' }
    let(:redirect_uri)   { '/redirect_uri' }

    let(:redux_router_service_class) { ReactWebpackRails::ReduxIntegration::Services::ReduxRouter }
    let(:redux_router_service)       { instance_double('redux_router_service_class') }

    let(:result)  { { 'code' => status_code, 'body' => 'result_body', 'redirectUri' => redirect_uri } }
    let(:payload) { { name: router_name, storeName: store_name, path: path } }

    let(:router_arguments) { ['redux-router', payload, {}] }

    before do
      allow(redux_router_service_class).to receive(:new) { redux_router_service }
      allow(redux_router_service).to receive(:result)    { result }
      allow(redux_router_service).to receive(:payload)   { payload }
      allow(redux_router_service).to receive(:options)   { {} }
    end

    context 'when result code is 200' do
      let(:status_code) { 200 }

      it 'calls #rwr_element with proper params' do
        expect(helper).to receive(:rwr_element).with(*router_arguments) do |_, &block|
          expect(block.call).to eq(result['body'].html_safe)
        end

        helper.redux_router(router_name, storeName: store_name)
      end
    end

    context 'when result code is 302' do
      let(:status_code) { 302 }

      it 'redirects to redirect_uri' do
        expect(controller).to receive(:redirect_to).with(redirect_uri)

        helper.redux_router(router_name, storeName: store_name)
      end
    end

    context 'when result code is not 200 nor 302' do
      let(:status_code) { 404 }

      it 'raises an error' do
        expect{ helper.redux_router(router_name, storeName: store_name) }.to raise_error
      end
    end
  end
end
