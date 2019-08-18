import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { Page2Component } from './page2/page2.component';


const routes: Routes = [
    {
        path: '',
        component: HomePageComponent
    },
    {
        path: 'page2',
        component: Page2Component
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
