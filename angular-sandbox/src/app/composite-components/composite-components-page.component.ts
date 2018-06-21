import {Component} from '@angular/core';

@Component({
  template: `
    <div class="content">
      <h1>Decorator component</h1>
      <app-decorator>transclude this stuff please</app-decorator>
    </div>
  `
})
export class CompositeComponentsPageComponent {

}
