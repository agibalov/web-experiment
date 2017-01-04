import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Component } from "@angular/core";
import { HttpModule } from "@angular/http";

interface Env {
    THE_VERSION: string;
    ENV: string;
    BUILD_TIME: string;
}

@Component({
    selector: 'app',
    template: `
<div>
    <p>Version: {{env.THE_VERSION}}</p>
    <p>ENV: {{env.ENV}}</p>
    <p>Build time: {{env.BUILD_TIME}}</p>
    <button type="button" (click)="doSomething()">Do Something</button>
</div>
`
})
class AppComponent {
    private env: Env;

    constructor() {
        this.env = process.env;
    }

    doSomething(): void {
        console.log('hello world');
    }
}

@NgModule({
    imports: [ BrowserModule, HttpModule ],
    declarations: [
        AppComponent
    ],
    providers: [ ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
