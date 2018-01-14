import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {DragulaModule} from "ng2-dragula";
import {DragulaExperimentComponent} from "./dragula-experiment.component";
import {NgdragdropExperimentComponent} from "./ngdragdrop-experiment.component";
import {RouterModule, Routes} from "@angular/router";
import {NgDragDropModule} from "ng-drag-drop";

const appRoutes: Routes = [
    {
        path: '',
        component: NgdragdropExperimentComponent
    },
    {
        path: 'dragula',
        component: DragulaExperimentComponent
    }
];

@NgModule({
    declarations: [
        AppComponent,
        NgdragdropExperimentComponent,
        DragulaExperimentComponent
    ],
    imports: [
        BrowserModule,
        DragulaModule,
        NgDragDropModule.forRoot(),
        RouterModule.forRoot(appRoutes)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
