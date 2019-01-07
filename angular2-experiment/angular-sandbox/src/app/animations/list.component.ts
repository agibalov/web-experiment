import {Component} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-list',
  template: `
    <div @blockInitialRenderAnimations>
      <button type="button" class="button is-small" (click)="addItem()">Add item</button>
      <ul>
        <li *ngFor="let item of items" @itemState>
          {{item}} <button type="button" class="button is-small" (click)="removeItem(item)">Remove</button>
        </li>
      </ul>
    </div>`,
  animations: [
    trigger('blockInitialRenderAnimations', [
      transition(':enter', [])
    ]),
    trigger('itemState', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('200ms', style({
          opacity: 1,
          transform: 'translateX(0)'
        }))
      ]),
      transition(':leave', [
        animate('200ms', style({
          opacity: 0,
          transform: 'translateX(100%)'
        }))
      ])
    ])
  ]
})
export class ListComponent {
  items = ['aaa', 'bbb', 'ccc'];

  addItem() {
    this.items.push(new Date().toISOString());
  }

  removeItem(item) {
    this.items = this.items.filter(i => i !== item);
  }
}
