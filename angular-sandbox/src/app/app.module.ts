import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AppComponent} from './app.component';
import {RandomModule} from './random/random.module';
import {StylingModule} from './styling/styling.module';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    RandomModule,
    StylingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
