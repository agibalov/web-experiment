import {Component, Input, TemplateRef} from '@angular/core';

@Component({
  selector: 'app-custom-list',
  template: `
    <ng-container *ngTemplateOutlet="headerTemplate || defaultHeaderTemplate; context:{itemCount: items.length}"></ng-container>
    <ul>
      <li *ngFor="let item of items">
        <ng-container *ngTemplateOutlet="itemTemplate || defaultItemTemplate; context:{item: item}"></ng-container>
      </li>
    </ul>
    <ng-container *ngTemplateOutlet="footerTemplate || defaultFooterTemplate; context:{itemCount: items.length}"></ng-container>
    
    <ng-template #defaultHeaderTemplate let-itemCount="itemCount">
      I am default header template ({{itemCount}})
    </ng-template>

    <ng-template #defaultItemTemplate let-item="item">
      I am default item template {{item|json}}
    </ng-template>

    <ng-template #defaultFooterTemplate let-itemCount="itemCount">
      I am default footer template ({{itemCount}})
    </ng-template>
  `
})
export class CustomListComponent {
  @Input() items: any[] = [];
  @Input() headerTemplate: TemplateRef<any>;
  @Input() itemTemplate: TemplateRef<any>;
  @Input() footerTemplate: TemplateRef<any>;
}
