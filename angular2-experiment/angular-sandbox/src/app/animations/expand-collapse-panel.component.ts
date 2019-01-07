import {Component} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-panel',
  template: `
    <div class="root">
      <div class="left">
        <button *ngIf="isExpanded" type="button" class="button" (click)="collapse()">
          <i class="fas fa-angle-double-right"></i>
        </button>
        <button *ngIf="!isExpanded" type="button" class="button" (click)="expand()">
          <i class="fas fa-angle-double-left"></i>
        </button>
        <p>Some text goes here and here and here and here and here.</p>
      </div>
      <div class="right" [@panelState]="state">
        <div class="content">
          <p>Some text here</p>
          <button type="button" class="button">Button 1</button>
        </div>
      </div>
    </div>
  `,
  styles: [`    
    .root {
      display: flex;
      flex-direction: row;
      border: 1px solid #555;
      width: 500px;
      overflow: hidden;
    }
    
    .left {
      flex-grow: 1;
      height: 200px;
    }
    
    .right {
      height: 200px;
      overflow-x: hidden;
      overflow-y: auto;
      width: 150px;
      min-width: 150px;
      background-color: #ccc;
    }

    .right .content {
      width: 150px;
      min-width: 150px;
    }
  `],
  animations: [
    trigger('panelState', [
      state('expanded', style({
        width: '150px',
        minWidth: '150px'
      })),
      state('collapsed', style({
        width: '0',
        minWidth: '0'
      })),
      transition('expanded => collapsed', animate('200ms ease-in-out')),
      transition('collapsed => expanded', animate('200ms ease-in-out'))
    ])
  ]
})
export class ExpandCollapsePanelComponent {
  isExpanded = true;

  get state() {
    return this.isExpanded ? 'expanded' : 'collapsed';
  }

  collapse() {
    this.isExpanded = false;
  }

  expand() {
    this.isExpanded = true;
  }
}
