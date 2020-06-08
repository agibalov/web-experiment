import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CounterPageComponent } from './counter-page/counter-page.component';
import { EditorPageComponent } from './editor-page/editor-page.component';
import { TodoPageComponent } from './todo-page/todo-page.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'counter'
  },
  {
    path: 'counter',
    component: CounterPageComponent
  },
  {
    path: 'editor',
    component: EditorPageComponent
  },
  {
    path: 'todos/:id',
    component: TodoPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
