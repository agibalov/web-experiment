import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  template: `
    <div class="content">
      <h3>Custom control</h3>
      <button type="button" class="button is-small" (click)="myNumberControl.setValue(123)">Set to 123</button>
      <app-number-editor [formControl]="myNumberControl"></app-number-editor>
      <pre>{{myNumberControl.value}}</pre>
      
      <h3>Reactive form hello world</h3>
      <div [formGroup]="formGroup">
        <input type="text" class="input" formControlName="someText">
        <label class="checkbox">
          <input type="checkbox" formControlName="someBoolean"> My checkbox
        </label>
      </div>
      <pre>{{formGroup.value|json}}</pre>
      <pre>{{events|json}}</pre>
    </div>
  `
})
export class ControlsPageComponent {
  myNumberControl: FormControl;
  formGroup: FormGroup;
  events: string[] = [];

  constructor() {
    this.myNumberControl = new FormControl(123);

    this.formGroup = new FormGroup({
      someText: new FormControl('some default text'),
      someBoolean: new FormControl(false)
    });

    this.formGroup.valueChanges.subscribe(next => {
      this.events.push(next);
    });
  }
}
