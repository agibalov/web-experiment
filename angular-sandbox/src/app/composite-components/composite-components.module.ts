import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {RouterModule} from '@angular/router';
import {DEMO_PAGE, DemoPage} from '../demo-page';
import {CompositeComponentsPageComponent} from './composite-components-page.component';
import {DecoratorComponent} from './decorator.component';

@NgModule({
  declarations: [
    CompositeComponentsPageComponent,
    DecoratorComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forChild([
      { path: 'composite-components', component: CompositeComponentsPageComponent }
    ])
  ],
  providers: [
    {
      provide: DEMO_PAGE,
      multi: true,
      useValue: <DemoPage>{
        title: 'Composite components',
        routerLink: 'composite-components'
      }
    }
  ]
})
export class CompositeComponentsModule { }
