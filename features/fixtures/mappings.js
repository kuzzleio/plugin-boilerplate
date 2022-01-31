module.exports = {
  iot: {
    alarms: {
      dynamic: 'false',
      properties: {
        task: { type: 'keyword' }
      }
    }
  },
  'tenant-kuzzle': {
    config: {
      dynamic: 'false',
      properties: {
        type: { type: 'keyword' }
      }
    }
  }
};
