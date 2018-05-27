import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AppComponent} from './app.component';
import {AppIfDirective} from './app-if.directive';
import {AppRepeatDirective} from './app-repeat.directive';
import {ModalService} from './modal.service';
import {ModalComponent} from './modal.component';

@NgModule({
  declarations: [
    AppComponent,
    AppIfDirective,
    AppRepeatDirective,
    ModalComponent
  ],
  entryComponents: [
    ModalComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    ModalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
