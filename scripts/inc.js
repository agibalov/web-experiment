// A better 'include' with tag support (yet worse than Asciidoctor)

var fs = require('fs');
var highlight = require('hexo-util').highlight;
var dedent = require('underscore.string').dedent;

const LOOKING_FOR_START_TAG = 0;
const LOOKING_FOR_END_TAG = 1;
const EXTRACTING_EVERYTHING = 2;

hexo.extend.tag.register('inc', function(args, content) {
  var filename = null;
  var tagname = null;
  var langname = null;
  for(var i = 0; i < args.length; ++i) {
    var arg = args[i];
    var match = arg.match(/lang:(\w+)/i);
    if(match) {
      langname = match[1];
    } else {
      match = arg.match(/tag:(\w+)/i);
      if(match) {
        tagname = match[1];
      } else {
        filename = arg;
      }
    }
  }

  if(!filename) {
    throw new Error('Filename is not specified');
  }

  var fileContent = fs.readFileSync(filename, 'utf-8');
  var fileLines = fileContent.split('\n');

  var state;
  if(tagname) {
    state = LOOKING_FOR_START_TAG;
  } else {
    state = EXTRACTING_EVERYTHING;
  }

  var extractedContent = '';
  for(var i = 0; i < fileLines.length; ++i) {
    // start::mysnippet
    var line = fileLines[i];
    if(state === LOOKING_FOR_START_TAG) {
      if(line.indexOf('start::' + tagname) > -1) {
        state = LOOKING_FOR_END_TAG;
      }
    } else if(state === LOOKING_FOR_END_TAG) {
      if(line.indexOf('end::' + tagname) > -1) {
        state = LOOKING_FOR_START_TAG;
      } else {
        extractedContent += line + '\n';
      }
    } else if(state === EXTRACTING_EVERYTHING) {
      extractedContent += line + '\n';
    } else {
      throw new Error('Unexpected state');
    }
    // end::mysnippet
  }

  if(state === LOOKING_FOR_END_TAG) {
    throw new Error('Did not find matching closing tag: ' + tagname);
  }

  extractedContent = extractedContent.trimRight();
  extractedContent = dedent(extractedContent);

  return highlight(extractedContent, {
    lang: langname
  });
});
