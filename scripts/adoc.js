//var process = require('process');
var asciidoctor = require('asciidoctor.js')();

/*
var opal = asciidoctor.Opal;
var opts = opal.hash2(['base_dir', 'safe'], {
    'base_dir': process.cwd(),
    'safe': 'safe'
});

var processor = asciidoctor.Asciidoctor(true);*/

function render(data, locals) {
    var html = asciidoctor.convert(data.text);
    html += `
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.8.0/styles/darcula.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.8.0/highlight.min.js"></script>
<script>hljs.initHighlighting()</script>
    `;

    return html;
}

hexo.extend.renderer.register('adoc', 'html', render, true);
