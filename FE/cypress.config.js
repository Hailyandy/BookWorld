const { defineConfig } = require("cypress");
// const UserEntity = require("./src/entity/userEntity")
module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config)
      on('file:preprocessor', require('@cypress/code-coverage/use-babelrc'))
      on('task', {
        // deconstruct the individual properties
        getUserEntity(testData) {
          console.log(testData)
          return null
        },
      })
      return config
    },
    baseUrl: 'http://localhost:3000',
    chromeWebSecurity: false,
    env: {
      FOO: 'bar',
    },

  },
});
