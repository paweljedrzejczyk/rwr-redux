require 'react_webpack_rails/redux_integration/version'

if defined?(Rails)
  require 'react_webpack_rails/redux_integration/engine'
  require 'react_webpack_rails/redux_integration/railtie'
end
