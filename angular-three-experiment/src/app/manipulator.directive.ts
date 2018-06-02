import {Directive, EventEmitter, HostListener, Output} from "@angular/core";
import {Vector2} from "three";

@Directive({
  selector: '[manipulator]'
})
export class ManipulatorDirective {
  @Output() move = new EventEmitter<Vector2>();

  private startPos: Vector2;

  @HostListener('mouseenter', ['$event'])
  @HostListener('mouseleave', ['$event'])
  @HostListener('mousemove', ['$event'])
  @HostListener('mousedown', ['$event'])
  @HostListener('mouseup', ['$event'])
  onMouseEvent(e: MouseEvent) {
    const bounds: {width: number, height: number} = (<any>event.target).getBoundingClientRect();
    const x = e.layerX / bounds.width;
    const y = e.layerY / bounds.width;

    if(this.startPos == null) {
      if(e.type === 'mousedown') {
        this.startPos = new Vector2(x, y);
      }
    } else {
      if(e.type === 'mousemove') {
        const currentPos = new Vector2(x, y);
        const diff = this.startPos.clone().sub(currentPos);
        this.move.emit(diff);
      } else if(e.type === 'mouseup') {
        this.startPos = null;
      }
    }
  }

  @HostListener('contextmenu', ['$event'])
  onContextMenu(e: Event) {
    e.preventDefault();
  }
}
