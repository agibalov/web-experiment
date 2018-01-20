import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomePageComponent} from "./home-page.component";
import {AnotherPageComponent} from "./another-page.component";
import {HomeNavComponent} from "./home-nav.component";

const appRoutes: Routes = [
    {
        path: '',
        component: HomePageComponent,
        pathMatch: 'full'
    },
    {
        path: '',
        component: HomeNavComponent,
        outlet: 'nav',
        pathMatch: 'full'
    },


    {
        path: 'another',
        component: AnotherPageComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, { enableTracing: true })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
