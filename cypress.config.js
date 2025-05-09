const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://reqres.in',
    defaultCommandTimeout: 10000,
    responseTimeout: 30000,
    requestTimeout: 30000,
  },
});