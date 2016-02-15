import version from './version';

class RWRRedux {
  constructor() {
    this.version = version;
  }

  get integrationWrapper() {
    return {};
  }
}

export default new RWRRedux;
