import { bootstrap } from 'angular2/platform/browser'
import { App } from './app'
import { CalculatorService } from './calculatorService'

document.addEventListener('DOMContentLoaded', function() {
  bootstrap(App, [CalculatorService]);
});
