import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { HelloComponent } from './hello/hello.component';

@NgModule({
  declarations: [
    AppComponent,
    HelloComponent
  ],
  imports: [
    BrowserModule,
    OverlayModule
  ],
  providers: [],
  entryComponents: [ HelloComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
