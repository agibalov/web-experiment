hexo.extend.tag.register('colorize', function(args, content) {
  // console.log('colorize called!', args, content);
  return '<p style="color: ' + args[0] + ';">' + content + '</p>';
}, { ends: true });
