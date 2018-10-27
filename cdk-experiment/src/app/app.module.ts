import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { HelloComponent } from './hello/hello.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    HelloComponent
  ],
  imports: [
    BrowserModule,
    OverlayModule,
    DragDropModule
  ],
  providers: [],
  entryComponents: [ HelloComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
