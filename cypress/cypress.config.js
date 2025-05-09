const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    
    baseUrl: 'https://www.saucedemo.com',
    video: true,
    screenshotOnRunFailure: true,
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: true,
      json: true
    }
  }
});
