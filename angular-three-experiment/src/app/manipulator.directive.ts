import {Directive, EventEmitter, HostListener, Output} from '@angular/core';
import {Vector2} from 'three';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[manipulator]'
})
export class ManipulatorDirective {
  @Output() manipulationBegin = new EventEmitter<void>();
  @Output() manipulationRotationUpdate = new EventEmitter<Vector2>();
  @Output() manipulationTranslationUpdate = new EventEmitter<Vector2>();
  @Output() manipulationEnd = new EventEmitter<void>();

  private manipulationType: ManipulationType;
  private startPos: Vector2;

  private readonly MOUSE_LEFT = 0;
  private readonly MOUSE_RIGHT = 2;

  @HostListener('mousemove', ['$event'])
  @HostListener('mousedown', ['$event'])
  @HostListener('mouseup', ['$event'])
  onMouseEvent(e: MouseEvent) {
    const bounds: {width: number, height: number} = (<any>event.target).getBoundingClientRect();
    const x = e.layerX / bounds.width;
    const y = e.layerY / bounds.width;

    if (this.startPos == null) {
      if (e.type === 'mousedown') {
        if (e.button === this.MOUSE_LEFT) {
          this.manipulationType = ManipulationType.Rotation;
          this.startPos = new Vector2(x, y);
          this.manipulationBegin.emit();
        } else if (e.button === this.MOUSE_RIGHT) {
          this.manipulationType = ManipulationType.Translation;
          this.startPos = new Vector2(x, y);
          this.manipulationBegin.emit();
        }
      }
    } else {
      if (e.type === 'mousemove') {
        const currentPos = new Vector2(x, y);
        const diff = this.startPos.clone().sub(currentPos);
        if (this.manipulationType === ManipulationType.Rotation) {
          this.manipulationRotationUpdate.emit(diff);
        } else if (this.manipulationType === ManipulationType.Translation) {
          this.manipulationTranslationUpdate.emit(diff);
        }
      } else if (e.type === 'mouseup') {
        if (e.button === this.MOUSE_LEFT || e.button === this.MOUSE_RIGHT) {
          this.manipulationEnd.emit();
          this.startPos = null;
          this.manipulationType = null;
        }
      }
    }
  }

  @HostListener('contextmenu', ['$event'])
  onContextMenu(e: Event) {
    e.preventDefault();
  }
}

enum ManipulationType {
  Rotation,
  Translation
}
