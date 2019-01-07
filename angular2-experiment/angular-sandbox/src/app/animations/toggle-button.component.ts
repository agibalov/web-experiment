import {Component} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-toggle-button',
  template: `
    <div @blockInitialRenderAnimations>
      <button type="button" class="button" 
              [@buttonState]="state" 
              (click)="toggle()">{{ show ? 'Hide' : 'Show' }}</button>
      <p *ngIf="show" @textState>Some text here</p>
    </div>
  `,
  animations: [
    trigger('blockInitialRenderAnimations', [
      transition(':enter', [])
    ]),
    trigger('buttonState', [
      state('hidden', style({
        color: '#aaa'
      })),
      state('visible', style({
      })),
      transition('hidden => visible', animate('1000ms')),
      transition('visible => hidden', animate('1000ms'))
    ]),
    trigger('textState', [
      transition(':enter', [
        style({
          opacity: 0
        }),
        animate('1000ms', style({
          opacity: 1
        }))
      ]),
      transition(':leave', [
        animate('1000ms', style({
          opacity: 0
        }))
      ])
    ])
  ]
})
export class ToggleButtonComponent {
  show = true;

  get state() {
    return this.show ? 'visible' : 'hidden';
  }

  toggle() {
    this.show = !this.show;
  }
}
