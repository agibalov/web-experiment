import {NgModule} from "@angular/core";
import {HeroesRoutingModule} from "./heroes-routing.module";
import {HeroListComponent} from "./hero-list.component";
import {HeroDetailsComponent} from "./hero-details.component";
import {HeroStubComponent} from "./hero-stub.component";
import {CommonModule} from "@angular/common";

@NgModule({
    imports: [
        HeroesRoutingModule,
        CommonModule
    ],
    declarations: [
        HeroListComponent,
        HeroDetailsComponent,
        HeroStubComponent
    ]
})
export class HeroesModule {
}
