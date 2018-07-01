const Viz = require('viz.js');
const { Module, render } = require('../node_modules/viz.js/full.render.js');

hexo.extend.tag.register('viz', async (args, content) => {
  const viz = new Viz({ Module, render });
  const svgXml = await viz.renderString(content);
  const svgElement = svgXml.match(/(<svg[\s\S]+<\/svg>)/)[1];
  return svgElement;
}, {
  async: true,
  ends: true
});
