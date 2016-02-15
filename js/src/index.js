import { integrationsManager } from 'react-webpack-rails';
import version from './version';

class RWRRedux {
  constructor() {
    this.version = version;
  }

  get integrationWrapper() {
    return {};
  }
  run() {}
}

export default new RWRRedux;
