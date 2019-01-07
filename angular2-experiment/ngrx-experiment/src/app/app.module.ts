import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { counterReducer } from './counter/counter';
import { StoreModule } from '@ngrx/store';
import { CounterComponent } from './counter/counter.component';
import { RouterModule } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { reducer } from './todo/todo';

@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({
      count: counterReducer,
      todos: reducer
    }),
    RouterModule.forRoot([
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'counter'
      },
      {
        path: 'counter',
        component: CounterComponent
      },
      {
        path: 'todo',
        component: TodoComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
