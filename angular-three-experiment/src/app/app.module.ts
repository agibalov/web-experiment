import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent, CameraDirective, ThreeDirective} from './app.component';

@NgModule({
    declarations: [
        AppComponent,
        ThreeDirective,
        CameraDirective
    ],
    imports: [
        BrowserModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
