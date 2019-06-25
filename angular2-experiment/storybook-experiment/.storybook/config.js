import { configure } from '@storybook/angular';

const req = require.context('../src/app', true, /\.stories\.ts$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
