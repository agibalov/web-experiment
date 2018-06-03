import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {StylingPageComponent} from './styling-page.component';
import {RouterModule} from '@angular/router';
import {ChildComponent} from './child.component';
import {HostComponent} from './host.component';

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
