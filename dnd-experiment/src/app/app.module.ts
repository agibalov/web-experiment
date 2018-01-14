import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {DragulaModule} from "ng2-dragula";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        DragulaModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
