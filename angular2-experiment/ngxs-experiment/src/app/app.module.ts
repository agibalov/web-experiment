import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalculatorService, CounterPageComponent, CounterState } from './counter-page/counter-page.component';
import { NgxsModule } from '@ngxs/store';
import { EditorPageComponent, EditorState } from './editor-page/editor-page.component';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CounterPageComponent,
    EditorPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxsModule.forRoot([CounterState, EditorState], {
      developmentMode: true,
      selectorOptions: {
        suppressErrors: false
      }
    }),
    NgxsFormPluginModule.forRoot(),
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
