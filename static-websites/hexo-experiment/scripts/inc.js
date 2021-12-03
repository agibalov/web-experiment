"use strict";

// A better 'include' with tag support (yet worse than Asciidoctor)

const fs = require('fs');
const highlight = require('hexo-util').highlight;
const dedent = require('underscore.string').dedent;

const LOOKING_FOR_START_TAG = 0;
const LOOKING_FOR_END_TAG = 1;
const EXTRACTING_EVERYTHING = 2;

hexo.extend.tag.register('inc', function(args, content) {
  let filename = null;
  let tagname = null;
  let langname = null;
  for(let i = 0; i < args.length; ++i) {
    const arg = args[i];
    let match = arg.match(/lang:(\w+)/i);
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

  const fileContent = fs.readFileSync(filename, 'utf-8');
  const fileLines = fileContent.split('\n');

  let state;
  if(tagname) {
    state = LOOKING_FOR_START_TAG;
  } else {
    state = EXTRACTING_EVERYTHING;
  }

  const startTagRegex = /start::(\w+)[ \t]*$/;
  const endTagRegex = /end::(\w+)[ \t]*$/;

  let extractedContent = '';
  for(let i = 0; i < fileLines.length; ++i) {
    // start::mysnippet
    const line = fileLines[i];
    let shouldAppendThisLine = false;
    if(state === LOOKING_FOR_START_TAG) {
      const match = line.match(startTagRegex);
      if(match && match[1] === tagname) {
        state = LOOKING_FOR_END_TAG;
      }
    } else if(state === LOOKING_FOR_END_TAG) {
      // start::myothersnippet
      const match = line.match(endTagRegex);
      if(match && match[1] === tagname) {
        state = LOOKING_FOR_START_TAG;
      } else {
        shouldAppendThisLine = true;
      }
      // end::myothersnippet
    } else if(state === EXTRACTING_EVERYTHING) {
      shouldAppendThisLine = true;
    } else {
      throw new Error('Unexpected state');
    }

    if(shouldAppendThisLine) {
      const lineIsAnotherStartOrEndTag =
        startTagRegex.test(line) || endTagRegex.test(line);
      if(lineIsAnotherStartOrEndTag) {
        continue;
      }

      extractedContent += line + '\n';
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
