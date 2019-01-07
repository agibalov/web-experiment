import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Component, forwardRef} from '@angular/core';

@Component({
  selector: 'app-number-editor',
  template: `
    <div class="field has-addons">
      <div class="control">
        <button type="button" class="button" (click)="changeValueBy(-1)">-</button>
      </div>
      <div class="control">
        <input class="input" type="text" [ngModel]="value" (ngModelChange)="setValueFromString($event)">
      </div>
      <div class="control">
        <button type="button" class="button" (click)="changeValueBy(1)">+</button>
      </div>
    </div>
  `,
  styles: [``],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberEditorComponent),
      multi: true
    }
  ]
})
export class NumberEditorComponent implements ControlValueAccessor {
  value: number;

  onChange: (_: any) => void = () => {};
  onTouched: () => void = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: any): void {
    this.value = parseInt(obj, 10);
  }

  setValueFromString(valueString: string) {
    this.value = parseInt(valueString, 10);
    this.onChange(this.value);
  }

  changeValueBy(delta: number) {
    this.value += delta;
    this.onChange(this.value);
  }
}
