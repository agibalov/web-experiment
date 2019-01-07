import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HeroListComponent} from "./hero-list.component";
import {HeroDetailsComponent} from "./hero-details.component";
import {HeroStubComponent} from "./hero-stub.component";

const heroRoutes: Routes = [
    {
        path: 'heroes',
        component: HeroListComponent,
        children: [
            {
                path: ':heroId',
                component: HeroDetailsComponent
            },
            {
                path: '',
                component: HeroStubComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(heroRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class HeroesRoutingModule {
}
