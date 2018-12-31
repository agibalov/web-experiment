#!/usr/bin/env bash

docker run \
  --rm \
  -v $(pwd):/src \
  -u emscripten \
  trzeci/emscripten \
  emcc src/main.cpp \
    -o public/main.js \
    -s EXPORTED_FUNCTIONS='["_main", "_addNumbers", "_makeGreeting"]'
