# chrome-extension-experiment

Figuring out how to build Chrome extensions.

## How to do things

### Development

In 3 separate terminal tabs:

* `npm run preview` - continuously builds to `/dist`
* `npx web-ext run --target=chromium --chromium-binary="$(which google-chrome)" --source-dir=dist` - deploys `/dist` to Chrome
* `npm run dev` - serves dummy API

### Making production builds

* `npm run build`
