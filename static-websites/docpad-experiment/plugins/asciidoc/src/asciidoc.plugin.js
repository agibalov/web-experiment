module.exports = function(BasePlugin) {
  var asciidoctor = require('asciidoctor.js')();
  var opal = asciidoctor.Opal;

  var processor = asciidoctor.Asciidoctor(true);

  return BasePlugin.extend({
    name: 'asciidoc',
    render: function(opts) {
      if(opts.inExtension === 'adoc' && opts.outExtension === 'html') {
        console.log('should process',
          opts.content, // asciidoc input
          opts.templateData.document.omg // 'omg' attribute in front matter
        );

        var html = processor.$convert(opts.content, opal.hash({
          'safe': 'SERVER',
          attributes: opal.hash({
            showtitle: '',
            dataFromPlugin: 'Plugin says hello'
          })
        }));

        opts.content = html;
      }
    }
  });
};
