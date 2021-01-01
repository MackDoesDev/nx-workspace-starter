const fs = require('fs');
const workspaceConfig = require('./workspace.json');

const TAILWIND_CONFIG_FILE = 'tailwind.config.js';

const PROCESS = process.argv[3];
const [project] = PROCESS.split(':');

let plugins = { autoprefixer: {} };

const projectConfig = workspaceConfig.projects[project];

if (projectConfig && projectConfig.projectType === 'application') {
  let config;
  if (fs.existsSync(`${projectConfig.root}/${TAILWIND_CONFIG_FILE}`)) {
    config = `./${projectConfig.root}/${TAILWIND_CONFIG_FILE}`;
  } else if (fs.existsSync(TAILWIND_CONFIG_FILE)) {
    config = `./${TAILWIND_CONFIG_FILE}`;
  }

  if (config) {
    plugins = {
      'postcss-import': {},
      'tailwindcss': {
        config,
      },
      ...plugins,
    };
  }
}

module.exports = {
  plugins,
};
