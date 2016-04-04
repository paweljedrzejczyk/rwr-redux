require 'spec_helper'
require 'react_webpack_rails/redux_integration/services/redux_element'
require 'react_webpack_rails/node_helpers'
require 'react_webpack_rails/node_integration_runner'

require 'active_support/all'

describe ReactWebpackRails::ReduxIntegration::Services::ReduxElement do
  let(:integration_name) { 'redux-container' }

  let(:name)         { 'element_name' }
  let(:store_name)   { 'store_name' }
  let(:server_side)  { false }
  let(:options)      { { server_side: server_side, store_name: store_name, foo: 'bar' } }
  let(:path)         { nil }

  let(:node_runner_class) { ReactWebpackRails::NodeIntegrationRunner }
  let(:redux_element)     { described_class.new(integration_name, name, options, path) }

  let(:expected_payload) { { name: name, storeName: store_name } }

  describe '#result' do
    context 'when server_side: false' do
      it { expect(redux_element.result).to eq(nil) }
    end

    context 'when server_side: true' do
      let(:server_side) { true }
      let(:node_runner) { instance_double('node_runner_class') }
      let(:json_result) { { code: 200, body: '<div>result</div>' }.to_json }

      before do
        allow(node_runner_class).to receive(:new) { node_runner }
        allow(node_runner).to receive(:run) { json_result }
      end

      it 'calls NodeIntegrationRunner instance' do
        expect(node_runner_class).to receive(:new).with('redux-container', expected_payload)
          .and_return(node_runner)
        expect(node_runner).to receive(:run)

        redux_element.result
      end

      it 'returns parsed result' do
        expect(redux_element.result).to eq({'code' => 200, 'body' => '<div>result</div>'})
      end
    end
  end

  describe '#payload' do
    context 'when path is nil' do
      it { expect(redux_element.payload).to eq(expected_payload) }
    end

    context 'when path is not nil' do
      let(:path) { '/path' }
      let(:expected_payload) { { name: name, storeName: store_name, path: '/path' } }

      it { expect(redux_element.payload).to eq(expected_payload) }
    end
  end

  describe '#options' do
    let(:expected_options) { { foo: 'bar' } }

    it { expect(redux_element.options).to eq(expected_options) }
  end
end
