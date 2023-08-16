const { defineConfig } = require("cypress");
const db = require('./cypress/db');

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      on('task', {
        'seedDB': async () => {
          const result = await db.seed();
          if (result === "ok") {
            return null;
          } else {
            throw new Error('Database transaction failed.');
          }
        },
      })
    }
  },
});
