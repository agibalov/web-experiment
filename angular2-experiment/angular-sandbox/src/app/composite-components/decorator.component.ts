import {Component} from '@angular/core';

@Component({
  selector: 'app-decorator',
  template: `
    <div>
      <div>decorator before</div>
      <div>
        <ng-content></ng-content>
      </div>
      <div>decorator after</div>
    </div>
  `
})
export class DecoratorComponent {
}
