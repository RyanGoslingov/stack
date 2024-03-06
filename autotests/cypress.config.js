const { defineConfig } = require("cypress");


module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demo.app.stack-it.ru/fl',
  },
});
