require 'spec_helper'
require 'react_webpack_rails/redux_integration/services/redux_container'
require 'react_webpack_rails/node_helpers'
require 'react_webpack_rails/node_integration_runner'

require 'active_support/all'

describe ReactWebpackRails::ReduxIntegration::Services::ReduxContainer do
  let(:integration_name) { 'redux-container' }
  let(:container_name)   { 'container_name' }
  let(:store_name)       { 'store_name' }
  let(:integration_name) { 'redux-container' }
  let(:server_side)      { true }

  let(:options) { { server_side: server_side, props: { foo: 'bar' }, store_name: store_name, foo: 'bar' } }

  let(:node_runner_class) { ReactWebpackRails::NodeIntegrationRunner }
  let(:redux_container)   { described_class.new(integration_name, container_name, options) }

  let(:expected_payload)  { { name: container_name, props: { foo: 'bar' }, storeName: store_name } }

  describe '#result' do
    context 'when server_side: true' do
      let(:node_runner) { instance_double('node_runner_class') }
      let(:json_result) { { body: '<div>result</div>' }.to_json }

      before do
        allow(node_runner_class).to receive(:new) { node_runner }
        allow(node_runner).to receive(:run) { json_result }
      end

      it 'calls NodeIntegrationRunner instance' do
        expect(node_runner_class).to receive(:new).with('redux-container', expected_payload)
          .and_return(node_runner)
        expect(node_runner).to receive(:run)

        redux_container.result
      end

      it 'returns parsed result' do
        expected_result = { 'body' => '<div>result</div>' }
        expect(redux_container.result).to eq(expected_result)
      end
    end

    context 'when server_side: false' do
      let(:server_side) { false }

      it 'returns empty result hash' do
        expected_result = { 'body' => '' }
        expect(redux_container.result).to eq(expected_result)
      end
    end
  end

  describe '#payload' do
    it { expect(redux_container.payload).to eq(expected_payload) }
  end

  describe '#options' do
    let(:expected_options) { { foo: 'bar' } }

    it { expect(redux_container.options).to eq(expected_options) }
  end
end
