import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  template: `
    <div class="content">
      <h3>Controls</h3>
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
  formGroup: FormGroup;
  events: string[] = [];

  constructor() {
    this.formGroup = new FormGroup({
      someText: new FormControl('some default text'),
      someBoolean: new FormControl(false)
    });

    this.formGroup.valueChanges.subscribe(next => {
      this.events.push(next);
    });
  }
}
