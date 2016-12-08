// eslint-disable-next-line import/prefer-default-export
export const getCounter = () => fetch('/api/counter')
  .then(r => r.json());
