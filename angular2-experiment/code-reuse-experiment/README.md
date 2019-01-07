# code-reuse-experiment

Experimenting with Angular/TypeScript code reuse.

* `packages/shared` is a reusable code library - an implementation of `Calculator` service.
* `packages/electron-app` is an Angular/Electron/Photon calculator application. It relies on the functionality provided by `packages/shared`.
* `packages/web-app` is an Angular/Bulma web application. It relies on the functionality provided by `packages/shared`.
* `packages/ns-app` is a NativeScript application (Android + iOS). It relies on the functionality provided by `packages/shared`.

To run it:

* Have [lerna](https://lernajs.io/) installed globally.
* `lerna bootstrap` to install all dependencies and build the shared module.
* `lerna run electron:start` to run the electron app.
* `lerna run web:start` to run the web app.
* `lerna run android:start` to run on Android (make sure to create AVD before trying to run it)
* `lerna run ios:start` to run on iOS simulator.

NOTE: While this whole project relies on [lerna](https://lernajs.io/), I didn't manage to make it work with `tns`: whenever I run `tns run`, it does some sort of `npm install`, so the `shared` package gets removed from `ns-app`'s `node_modules`. The current workaround is just to list the dependency as `"shared": "file:../shared"` instead of `"shared": "^1.0.0"`.

### Images

![demo-electron](https://github.com/agibalov/angular2-experiment/raw/master/code-reuse-experiment/demo-electron.png)

![demo-web](https://github.com/agibalov/angular2-experiment/raw/master/code-reuse-experiment/demo-web.png)

![demo-ns](https://github.com/agibalov/angular2-experiment/raw/master/code-reuse-experiment/demo-ns.png)
