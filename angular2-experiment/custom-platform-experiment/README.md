# custom-platform-experiment

Angular 2+ has a notion of *platforms*. Angular itself provides at least [platform-browser-dynamic](https://github.com/angular/angular/tree/master/packages/platform-browser-dynamic) (for browser apps) and [platform-server](https://github.com/angular/angular/tree/master/packages/platform-server) (for server-side rendering) and there are also at least one 3rd-party platform - [NativeScript](https://github.com/NativeScript/nativescript-angular) (for Android and iOS native applications).

This project demonstrates how the minimal platform looks like. Briefly:

```ts
@Component({
    selector: 'app',
    template: `Hello World!`
})
class AppComponent {}

@NgModule({
    declarations: [ AppComponent ],
    imports: [ DummyModule ],
    bootstrap: [ AppComponent ]
})
class AppModule {}

platformDummy().bootstrapModule(AppModule).then(appModule => {
    console.log(appModule.injector.get(DummyElement));
});
```

Gives you:

```
Angular is running in the development mode. Call enableProdMode() to enable the production mode.
DummyElement {
  children: [ DummyTextElement { text: 'Hello World!' } ],
  attributes: { 'ng-version': '5.2.0' } }
```

Run with `npm start`.
