import {Component, forwardRef, Input} from '@angular/core';
import {Vector3} from 'three';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'vector-editor',
  template: `
    <pre>
<ng-container *ngIf="name != null"><span class="has-text-weight-bold">{{name}}</span>
</ng-container>  X: <input type="range" class="slider is-small is-circle is-success" [min]="-inputRange" [max]="inputRange"
                           [step]="inputStep" [(ngModel)]="visualX"> ({{realX|exponential}})
  Y: <input type="range" class="slider is-small is-circle is-success" [min]="-inputRange" [max]="inputRange" [step]="inputStep"
            [(ngModel)]="visualY"> ({{realY|exponential}})
  Z: <input type="range" class="slider is-small is-circle is-success" [min]="-inputRange" [max]="inputRange" [step]="inputStep"
            [(ngModel)]="visualZ"> ({{realZ|exponential}})</pre>
  `,
  styles: [`
    pre {
      margin: 0;
      padding: 0;
    }

    input.slider {
      margin: 0;
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VectorEditorComponent),
      multi: true
    }
  ]
})
export class VectorEditorComponent implements ControlValueAccessor {
  readonly inputRange = 100;
  readonly inputStep = 1;

  @Input() name: string;
  @Input() range = 1.0;
  vector: Vector3 = new Vector3(0, 0, 0);

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
    this.vector = obj;
    this.onChange(this.vector);
  }

  get realX() {
    return this.vector != null ? this.vector.x : null;
  }

  get visualX() {
    return this.vector != null ? (this.vector.x / this.range) * this.inputRange : null;
  }

  set visualX(value: number) {
    this.vector = this.vector.setX((value / this.inputRange) * this.range).clone();
    this.onChange(this.vector);
  }

  get realY() {
    return this.vector != null ? this.vector.y : null;
  }

  get visualY() {
    return this.vector != null ? (this.vector.y / this.range) * this.inputRange : null;
  }

  set visualY(value: number) {
    this.vector = this.vector.setY((value / this.inputRange) * this.range).clone();
    this.onChange(this.vector);
  }

  get realZ() {
    return this.vector != null ? this.vector.z : null;
  }

  get visualZ() {
    return this.vector != null ? (this.vector.z / this.range) * this.inputRange : null;
  }

  set visualZ(value: number) {
    this.vector = this.vector.setZ((value / this.inputRange) * this.range).clone();
    this.onChange(this.vector);
  }
}
