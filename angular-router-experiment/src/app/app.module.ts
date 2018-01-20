import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HomePageComponent} from "./home-page.component";
import {AnotherPageComponent} from "./another-page.component";
import {AppRoutingModule} from "./app-routing.module";
import {HeroesModule} from "./heroes/heroes.module";
import {NotesModule} from "./notes/notes.module";
import {HomeNavComponent} from "./home-nav.component";
import {DatabaseService} from "./database.service";

function makeDatabaseServiceInitializer(databaseService: DatabaseService) {
    return async () => {
        await databaseService.initialize();
    };
}

@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
        HomeNavComponent,
        AnotherPageComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HeroesModule,
        NotesModule
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: makeDatabaseServiceInitializer,
            multi: true,
            deps: [ DatabaseService ]
        },
        DatabaseService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
