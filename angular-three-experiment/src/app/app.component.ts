import {Component} from '@angular/core';
import {Vector3} from 'three';

@Component({
  selector: 'app-root',
  template: `
    <canvas style="width: 100%; height: 400px;" manipulator (move)="position = vector3($event.x, $event.y, -1)" three>
      <camera [position]="position" [target]="target" fov="60"></camera>
      <scene>
        <dummy *ngIf="showDummy" [position]="dummyPosition"></dummy>
        <dummy *ngIf="showDummy" [position]="dummyPosition2"></dummy>
      </scene>
    </canvas>
    <button (click)="showHideDummy()">Show/hide dummy</button>
    <button (click)="toggleDummyPosition()">Toggle dummy position</button>
    <pre>{{position|json}}</pre>
  `,
  styles: [``]
})
export class AppComponent {
  position: Vector3 = new Vector3(0, 0, -1);
  target: Vector3 = new Vector3(0, 0, 0);
  dummyPosition: Vector3 = new Vector3(-0.1, 0, 0);
  dummyPosition2: Vector3 = new Vector3(1, 0, 0);
  showDummy = true;

  toggleDummyPosition() {
    this.dummyPosition = new Vector3(-this.dummyPosition.x, this.dummyPosition.y, this.dummyPosition.z);
    this.dummyPosition2 = new Vector3(-this.dummyPosition2.x, this.dummyPosition2.y, this.dummyPosition2.z);
  }

  showHideDummy() {
    this.showDummy = !this.showDummy;
  }

  vector3(x: number, y: number, z: number) {
    return new Vector3(x, y, z);
  }
}
