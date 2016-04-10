require 'spec_helper'
require 'react_webpack_rails/redux_integration/services/redux_router'
require 'react_webpack_rails/node_helpers'
require 'react_webpack_rails/node_integration_runner'

require 'active_support/all'

describe ReactWebpackRails::ReduxIntegration::Services::ReduxRouter do
  let(:integration_name) { 'redux-router' }
  let(:router_name)      { 'router_name' }
  let(:store_name)       { 'store_name' }
  let(:integration_name) { 'redux-router' }
  let(:server_side)      { true }
  let(:path)             { '/path' }

  let(:options) { { server_side: server_side, store_name: store_name, foo: 'bar' } }

  let(:node_runner_class) { ReactWebpackRails::NodeIntegrationRunner }
  let(:redux_router)      { described_class.new(integration_name, router_name, options, path) }

  let(:expected_payload)  { { name: router_name, storeName: store_name, path: path } }

  describe '#result' do
    context 'when server_side: true' do
      let(:node_runner) { instance_double('node_runner_class') }
      let(:json_result) { { code: 200, body: '<div>result</div>' }.to_json }

      before do
        allow(node_runner_class).to receive(:new) { node_runner }
        allow(node_runner).to receive(:run) { json_result }
      end

      it 'calls NodeIntegrationRunner instance' do
        expect(node_runner_class).to receive(:new).with('redux-router', expected_payload)
          .and_return(node_runner)
        expect(node_runner).to receive(:run)

        redux_router.result
      end

      it 'returns parsed result' do
        expected_result = { 'code' => 200, 'body' => '<div>result</div>' }
        expect(redux_router.result).to eq(expected_result)
      end
    end

    context 'when server_side: false' do
      let(:server_side) { false }

      it 'returns empty result hash' do
        expected_result = { 'code' => 200, 'body' => '' }
        expect(redux_router.result).to eq(expected_result)
      end
    end
  end

  describe '#payload' do
    it { expect(redux_router.payload).to eq(expected_payload) }
  end

  describe '#options' do
    let(:expected_options) { { foo: 'bar' } }

    it { expect(redux_router.options).to eq(expected_options) }
  end
end
