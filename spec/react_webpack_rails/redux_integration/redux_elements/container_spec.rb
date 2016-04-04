require 'spec_helper'
require 'react_webpack_rails/redux_integration/redux_elements/container'
require 'react_webpack_rails/node_helpers'
require 'react_webpack_rails/node_integration_runner'

require 'active_support/all'

describe ReactWebpackRails::ReduxIntegration::ReduxElements::Container do
  let(:name)         { 'container_name' }
  let(:store_name)   { 'store_name' }
  let(:server_side) { false }
  let(:options)      { { server_side: server_side, store_name: store_name, foo: 'bar' } }

  let(:node_runner_class) { ReactWebpackRails::NodeIntegrationRunner }
  let(:container_element) { described_class.new(name, options) }

  let(:expected_payload) { { name: name, storeName: store_name } }

  describe '#result' do
    context 'when server_side: false' do
      it { expect(container_element.result).to eq(nil) }
    end

    context 'when server_side: true' do
      let(:server_side) { true }
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

        container_element.result
      end

      it 'returns parsed result' do
        expect(container_element.result).to eq('<div>result</div>')
      end
    end
  end

  describe '#payload' do
    it { expect(container_element.payload).to eq(expected_payload) }
  end

  describe '#options' do
    let(:expected_options) { { foo: 'bar' } }

    it { expect(container_element.options).to eq(expected_options) }
  end
end
