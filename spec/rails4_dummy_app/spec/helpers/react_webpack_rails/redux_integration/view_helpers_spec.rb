require 'rails_helper'

describe ReactWebpackRails::ReduxIntegration::ViewHelpers, type: :helper do
  let(:node_runner_class) { ReactWebpackRails::NodeIntegrationRunner }

  describe '#redux_store' do
    let(:store_args) { ['redux-store', { name: 'StoreName', props: { 'foo' => 'bar' } }] }

    it { expect(helper).to respond_to(:redux_store) }

    it 'calls #react_element with proper params' do
      expect(helper).to receive(:react_element).with(*store_args, {}).once

      helper.redux_store('StoreName', foo: 'bar')
    end

    context 'when props are not passed' do
      it 'sets an empty hash as a default' do
        expect(helper)
          .to receive(:react_element)
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

      it 'calls #react_element with proper params' do
        expect(helper).to receive(:react_element).with(*store_args, {}).once

        helper.redux_store('StoreName', { foo: 'bar' }, server_side: true)
      end
    end
  end

  describe '#redux_container' do
    let(:container_arguments) do
      ['redux-container', { name: 'ContainerName', storeName: 'StoreName' }]
    end

    it { expect(helper).to respond_to(:redux_container) }

    it 'calls #react_element with proper params' do
      expect(helper).to receive(:react_element).with(*container_arguments, {}).once

      helper.redux_container('ContainerName', store_name: 'StoreName')
    end

    context 'when store_name is not passed' do
      it 'sets nil as a default' do
        expect(helper)
          .to receive(:react_element)
          .with('redux-container', { name: 'ContainerName', storeName: nil }, {})
          .once

        helper.redux_container('ContainerName')
      end
    end

    context 'when server_side is true' do
      let(:node_runner) { instance_double('node_runner_class') }
      let(:result_string) { '<div>result</div>' }

      before do
        allow(node_runner_class).to receive(:new) { node_runner }
        allow(node_runner).to receive(:run)
      end

      it 'NodeIntegrationRunner instance and #react_element with proper arguments' do
        expect(node_runner_class).to receive(:new).with(*container_arguments) { node_runner }
        expect(node_runner).to receive(:run) { result_string }

        expect(helper).to receive(:react_element).with(*container_arguments, {}) do |*args, &block|
          expect(block.call).to eq(result_string.html_safe)
        end

        helper.redux_container('ContainerName', store_name: 'StoreName', server_side: true)
      end
    end
  end
end
