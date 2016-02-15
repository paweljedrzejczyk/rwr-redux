function _isFunction(func) {
  return typeof func === 'function';
}

function _isObject(obj) {
  return obj !== null && typeof obj === 'object';
}

function _isReduxStore(store) {
  return (_isFunction(store.subscribe) &&
    _isFunction(store.dispatch) &&
    _isFunction(store.dispatch)
  );
}

export function isFunction(func, errorMsg) {
  if (!_isFunction(func)) throw new Error(errorMsg);
}

export function isReduxStore(store, errorMsg) {
  if (!_isObject(store) || !_isReduxStore(store)) throw new Error(errorMsg);
}
