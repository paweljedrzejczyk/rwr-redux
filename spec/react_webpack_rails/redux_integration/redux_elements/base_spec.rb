require 'spec_helper'
require 'react_webpack_rails/redux_integration/redux_elements/base'
require 'active_support/core_ext/hash/except'

describe ReactWebpackRails::ReduxIntegration::ReduxElements::Base do
  let(:name)         { 'element_name' }
  let(:store_name)   { 'store_name' }
  let(:options)      { { server_side: true, store_name: store_name, foo: 'bar' } }
  let(:base_element) { described_class.new(name, options) }

  describe '#payload' do
    let(:expected_payload) { { name: name, storeName: store_name } }

    it { expect(base_element.payload).to eq(expected_payload) }
  end

  describe '#options' do
    let(:expected_options) { { foo: 'bar' } }

    it { expect(base_element.options).to eq(expected_options) }
  end
end
