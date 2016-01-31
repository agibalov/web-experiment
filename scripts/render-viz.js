var Viz = require('viz.js');

hexo.extend.tag.register('viz', function(args, content) {
  return Viz(content, {
    format: 'svg',
    engine: 'dot'
  }).match(/(<svg[\s\S]+<\/svg>)/)[1];
}, { ends: true });
