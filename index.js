require('dotenv').config();
const absenin = require('./lib/absenin');
const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;
const HEADLESS = process.env.HEADLESS === 'true';

(async () => {
  absenin.start(USERNAME, PASSWORD, { headless: HEADLESS });
})();