import { integrationsManager } from 'react-webpack-rails';
import version from './version';

class RWRAlt {
  constructor() {
    this.version = version;
  }

  get integrationWrapper() {
    return {};
  }
  run() {}
}

export default new RWRAlt;
