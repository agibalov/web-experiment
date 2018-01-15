# code-reuse-experiment

Experimenting with Angular/TypeScript code reuse.

* `packages/shared` is a reusable code library - an implementation of `Calculator` service.
* `packages/electron-app` is an Angular/Electron/Photon calculator application. It relies on the functionality provided by `packages/shared`.
* `packages/web-app` is an Angular/Bulma web application. It relies on the functionality provided by `packages/shared`.

To run it:

* `npm i && npm run bootstrap` to install all dependencies and build the shared module.
* `cd packages/electron-app && npm start` to run the electron app.
* `cd packages/web-app && npm start` to run the web app.

![demo-electron](https://github.com/agibalov/angular2-experiment/raw/master/code-reuse-experiment/demo-electron.png)


![demo-web](https://github.com/agibalov/angular2-experiment/raw/master/code-reuse-experiment/demo-web.png)
