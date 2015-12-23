import { Component, Inject } from 'angular2/core'
import { ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig } from 'angular2/router'
import { Page1 } from './page1'
import { Calculator } from './calculator'

@Component({
  selector: 'app',
  template: `
    <div class="app">
      <a [routerLink]="['Page1']">Page 1</a>
      <a [routerLink]="['Calculator']">Calculator</a>
      <router-outlet></router-outlet>
    </div>`,
  directives: [Calculator, ROUTER_DIRECTIVES]
})
@RouteConfig([
  { path: '/page1', name: 'Page1', component: Page1, useAsDefault: true },
  { path: '/calculator', name: 'Calculator', component: Calculator }
])
export class App {
}
