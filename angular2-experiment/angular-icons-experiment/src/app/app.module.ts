import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FontAwesomeModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(library: FaIconLibrary) {
        library.addIconPacks(fas, far, fab);
    }
}
