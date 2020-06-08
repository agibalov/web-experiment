import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalculatorService, CounterPageComponent, CounterState } from './counter-page/counter-page.component';
import { NgxsModule } from '@ngxs/store';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { EditorPageComponent, EditorState } from './editor-page/editor-page.component';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoPageComponent, TodoPageState } from './todo-page/todo-page.component';

@NgModule({
  declarations: [
    AppComponent,
    CounterPageComponent,
    EditorPageComponent,
    TodoPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxsModule.forRoot([CounterState, EditorState, TodoPageState], {
      developmentMode: true,
      selectorOptions: {
        suppressErrors: false
      }
    }),
    NgxsFormPluginModule.forRoot(),
    NgxsRouterPluginModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    CalculatorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
