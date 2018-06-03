import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ChildComponent, HostComponent} from './stylish.components';
import {StylingPageComponent} from './styling-page.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    ChildComponent,
    HostComponent,
    StylingPageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forChild([
      { path: 'styling', component: StylingPageComponent }
    ])
  ]
})
export class StylingModule { }
