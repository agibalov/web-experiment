import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AppComponent} from './app.component';
import {AppIfDirective} from './app-if.directive';
import {AppRepeatDirective} from './app-repeat.directive';

@NgModule({
  declarations: [
    AppComponent,
    AppIfDirective,
    AppRepeatDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
