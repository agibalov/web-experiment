import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { HelloComponent } from './hello/hello.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { ItemComponent } from './item/item.component';

@NgModule({
  declarations: [
    AppComponent,
    HelloComponent,
    ItemComponent
  ],
  imports: [
    BrowserModule,
    OverlayModule,
    DragDropModule,
    ScrollDispatchModule
  ],
  providers: [],
  entryComponents: [ HelloComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
