import {Component} from '@angular/core';

@Component({
  template: `
    <div class="content">
      <h1>Decorator component</h1>
      <p>Illustrates how a single ng-content element works.</p>
      <app-decorator>transclude this stuff please</app-decorator>
      
      <h1>Header component</h1>
      <p>Illustrates how multiple ng-content elements work.</p>
      <app-header>
        <div class="title">
          <h1>Some title</h1>
          <h2>Some subtitle</h2>
        </div>
        <div class="extra">
          <div class="buttons">
            <button type="button" class="button">Button 1</button>
            <button type="button" class="button">Button 2</button>
            <button type="button" class="button">Button 3</button>
          </div>
        </div>
      </app-header>
    </div>
  `,
  styles: [`
    .title h1, .title h2 {
      padding: 0;
      margin: 0;
    }
    
    h1 {
      font-size: 20px;
    }
    
    h2 {
      font-size: 16px;
      text-transform: uppercase;
    }
  `]
})
export class CompositeComponentsPageComponent {
}
