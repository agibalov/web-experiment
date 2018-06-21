import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AppComponent} from './app.component';
import {RandomModule} from './random/random.module';
import {StylingModule} from './styling/styling.module';
import {RouterModule} from '@angular/router';
import {AnimationsModule} from './animations/animations.module';
import {CompositeComponentsModule} from './composite-components/composite-components.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', pathMatch: 'full', redirectTo: 'random' }
    ], { enableTracing: true }),
    RandomModule,
    StylingModule,
    AnimationsModule,
    CompositeComponentsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
