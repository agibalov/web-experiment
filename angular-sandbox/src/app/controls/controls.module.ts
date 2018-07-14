import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {DEMO_PAGE, DemoPage} from '../demo-page';
import {ControlsPageComponent} from './controls-page.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NumberEditorComponent} from './number-editor.component';

@NgModule({
  declarations: [
    ControlsPageComponent,
    NumberEditorComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forChild([
      { path: 'controls', component: ControlsPageComponent }
    ]),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: DEMO_PAGE,
      multi: true,
      useValue: <DemoPage>{
        title: 'Controls',
        routerLink: 'controls'
      }
    }
  ]
})
export class ControlsModule { }
