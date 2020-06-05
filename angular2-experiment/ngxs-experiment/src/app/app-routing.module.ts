import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CounterPageComponent } from './counter-page/counter-page.component';


const routes: Routes = [
  {
    path: 'counter',
    component: CounterPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
