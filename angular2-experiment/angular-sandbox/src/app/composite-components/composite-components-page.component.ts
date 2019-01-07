import {Component, TemplateRef, ViewChild} from '@angular/core';

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

      <h1>Custom list</h1>
      <div class="buttons">
        <button type="button" class="button is-small" (click)="addItem()">Add</button>
        <button type="button" class="button is-small" (click)="removeItem()">Remove</button>
        <button type="button" class="button is-small" (click)="toggleItemTemplate()">Toggle item template</button>
      </div>
      <app-custom-list [items]="items" 
                       [headerTemplate]="customHeaderTemplate"
                       [itemTemplate]="itemTemplate"></app-custom-list>
      <ng-template #customHeaderTemplate let-itemCount="itemCount">
        I am external header ({{itemCount}})
      </ng-template>
      <ng-template #customItemTemplate1 let-item="item">
        external template: {{item.id}} {{item.text}}
      </ng-template>
      <ng-template #customItemTemplate2 let-item="item">
        <span class="has-text-weight-bold">EXTERNAL TEMPLATE TWO</span>: {{item.id}} {{item.text}}
      </ng-template>
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
  @ViewChild('customItemTemplate1')
  private customItemTemplate1: TemplateRef<any>;

  @ViewChild('customItemTemplate2')
  private customItemTemplate2: TemplateRef<any>;

  useTemplateOne = true;
  items = [
    { id: '1', text: 'item one' },
    { id: '2', text: 'item two' }
  ];

  addItem() {
    this.items.push({
      id: `${new Date().getMilliseconds()}`,
      text: `Item ${new Date().toISOString()}`
    });
  }

  removeItem() {
    this.items.pop();
  }

  toggleItemTemplate() {
    this.useTemplateOne = !this.useTemplateOne;
  }

  get itemTemplate() {
    return this.useTemplateOne ? this.customItemTemplate1 : this.customItemTemplate2;
  }
}
