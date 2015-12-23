import { bootstrap } from 'angular2/platform/browser'
import { App } from './app'
import { CalculatorService } from './calculatorService'
import { provide, bind } from 'angular2/core'
import { ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy } from 'angular2/router'

document.addEventListener('DOMContentLoaded', () => {
  bootstrap(App, [
    CalculatorService,
    ROUTER_PROVIDERS,
    provide(LocationStrategy, { useClass: HashLocationStrategy }) // IMPORTANT: FIRST ROUTER_PROVIDERS, then LocationStrategy
  ])
});
