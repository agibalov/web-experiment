import {Component} from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <div class="level">
      <div class="level-left">
        <ng-content select=".title"></ng-content>
      </div>
      <div class="level-right">
        <ng-content select=".extra"></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .level {
      border: 1px solid #cfc;
    }
    
    .level-left, .level-right {
      border: 1px solid #fcc;
      padding: 10px;
    }
  `]
})
export class HeaderComponent {
}
