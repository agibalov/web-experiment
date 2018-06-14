import {Component} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  template: `
    <button type="button" class="button" 
            [@buttonState]="state" 
            (@buttonState.start)="start($event)" 
            (@buttonState.done)="done($event)"
            (click)="toggle()">Click me ({{state}}, {{transitionState}})</button>
  `,
  animations: [
    trigger('buttonState', [
      state('inactive', style({
        color: '#999'
      })),
      state('active', style({
        color: 'red'
      })),
      transition('inactive => active', animate('1000ms ease-in')),
      transition('active => inactive', animate('1000ms ease-in'))
    ])
  ]
})
export class AnimationsPageComponent {
  state = 'inactive';
  transitionState = '';

  toggle() {
    this.state = this.state === 'active' ? 'inactive' : 'active';
  }

  start(event) {
    console.log(`START from ${event.fromState} to ${event.toState}`);
    this.transitionState = `${event.fromState} => ${event.toState}`;
  }

  done(event) {
    console.log(`DONE from ${event.fromState} to ${event.toState}`);
    this.transitionState = '';
  }
}
