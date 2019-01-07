import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {Angulartics2Module} from "angulartics2";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home.component";
import {DummyAngulartics2Backend} from "./dummy-angulartics2-backend.service";
import {Page2Component} from "./page2.component";

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'page2', component: Page2Component }
];

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        Page2Component
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        Angulartics2Module.forRoot([DummyAngulartics2Backend])
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
