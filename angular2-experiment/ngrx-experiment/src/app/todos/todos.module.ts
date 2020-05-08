import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosPageComponent } from './todos-page/todos-page.component';
import { StoreModule } from '@ngrx/store';
import { todosFeatureKey, todosReducer } from './todos.reducer';
import { RouterModule, Routes } from '@angular/router';
import { TodoPageComponent } from './todo-page/todo-page.component';

const routes: Routes = [
  {
    path: 'todos',
    component: TodosPageComponent
  },
  {
    path: 'todos/:todoId',
    component: TodoPageComponent
  }
];

@NgModule({
  declarations: [
    TodosPageComponent,
    TodoPageComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    StoreModule.forFeature(todosFeatureKey, todosReducer)
  ]
})
export class TodosModule {
}
