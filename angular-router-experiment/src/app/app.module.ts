import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HomePageComponent} from "./home-page.component";
import {AnotherPageComponent} from "./another-page.component";
import {AppRoutingModule} from "./app-routing.module";
import {HeroesModule} from "./heroes/heroes.module";
import {NotesModule} from "./notes/notes.module";

@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
        AnotherPageComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HeroesModule,
        NotesModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
