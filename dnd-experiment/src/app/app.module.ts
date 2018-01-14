import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {DragulaModule} from "ng2-dragula";
import {DragulaExperimentComponent} from "./dragula-experiment.component";
import {NgdragdropExperimentComponent} from "./ngdragdrop-experiment.component";
import {RouterModule, Routes} from "@angular/router";
import {NgDragDropModule} from "ng-drag-drop";
import {NgxDndComponent} from "./ngx-dnd.component";
import {NgxDnDModule} from "@swimlane/ngx-dnd";

const appRoutes: Routes = [
    {
        path: '',
        component: NgdragdropExperimentComponent
    },
    {
        path: 'dragula',
        component: DragulaExperimentComponent
    },
    {
        path: 'ngxdnd',
        component: NgxDndComponent
    }
];

@NgModule({
    declarations: [
        AppComponent,
        NgdragdropExperimentComponent,
        DragulaExperimentComponent,
        NgxDndComponent
    ],
    imports: [
        BrowserModule,
        DragulaModule,
        NgDragDropModule.forRoot(),
        NgxDnDModule,
        RouterModule.forRoot(appRoutes)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
