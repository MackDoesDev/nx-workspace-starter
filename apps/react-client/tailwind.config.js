// eslint-disable-next-line @typescript-eslint/no-var-requires
const rootConfig = require('../../tailwind.config.js');

module.exports = Object.assign(rootConfig, {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [`${__dirname}/src/**/*.{jsx,tsx}`],
  },
});
