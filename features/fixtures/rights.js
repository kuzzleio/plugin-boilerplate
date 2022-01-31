module.exports = {
  roles: {
    anonymous: {
      controllers: {
        '*': {
          actions: {
            '*': true
          }
        },
        document: {
          actions: {
            '*': true,
            createOrReplace: false
          }
        },
        server: {
          actions: {
            now: false
          }
        }
      }
    },
  },
  users: {
    melis: {
      content: {
        profileIds: ['default']
      },
      credentials: {
        local: {
          username: 'melis',
          password: 'password'
        }
      }
    }
  }
};
