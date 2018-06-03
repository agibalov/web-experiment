import {Component, forwardRef, Input} from '@angular/core';
import {Vector3} from 'three';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'vector-editor',
  template: `
    <pre>
<ng-container *ngIf="name != null"><span class="has-text-weight-bold">{{name}}</span>
</ng-container>  X: <input type="range" class="slider is-small is-circle" [min]="min" [max]="max" step="0.01" [(ngModel)]="x"> ({{x|number:'1.3-3'}})
  Y: <input type="range" class="slider is-small is-circle" [min]="min" [max]="max" step="0.01" [(ngModel)]="y"> ({{y|number:'1.3-3'}})
  Z: <input type="range" class="slider is-small is-circle" [min]="min" [max]="max" step="0.01" [(ngModel)]="z"> ({{z|number:'1.3-3'}})</pre>
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

  get min() {
    return -this.range;
  }

  get max() {
    return this.range;
  }

  get x() {
    return this.vector != null ? this.vector.x : null;
  }

  set x(value: number) {
    this.vector = this.vector.setX(value).clone();
    this.onChange(this.vector);
  }

  get y() {
    return this.vector != null ? this.vector.y : null;
  }

  set y(value: number) {
    this.vector = this.vector.setY(value).clone();
    this.onChange(this.vector);
  }

  get z() {
    return this.vector != null ? this.vector.z : null;
  }

  set z(value: number) {
    this.vector = this.vector.setZ(value).clone();
    this.onChange(this.vector);
  }
}
