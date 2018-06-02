import {Component} from '@angular/core';
import {Vector2, Vector3} from 'three';

@Component({
  selector: 'app-root',
  // tslint:disable:no-trailing-whitespace
  template: `
    <canvas style="width: 100%; height: 600px;" manipulator
            (manipulationBegin)="handleManipulationBegin()"
            (manipulationUpdate)="handleManipulationUpdate($event)"
            (manipulationEnd)="handleManipulationEnd()"
            three>
      <camera [position]="cameraPosition" [target]="cameraTarget" fov="60"></camera>
      <scene>
        <dummy *ngIf="showDummy" [position]="dummyPosition"></dummy>
        <dummy *ngIf="showDummy" [position]="dummyPosition2"></dummy>
        <grid></grid>
      </scene>
    </canvas>
    <button (click)="showHideDummy()">Show/hide dummy</button>
    <button (click)="toggleDummyPosition()">Toggle dummy position</button>
    <pre>{{cameraPosition | json}}</pre>
  `,
  // tslint:enable:no-trailing-whitespace
  styles: [``]
})
export class AppComponent {
  cameraTarget = new Vector3(0, 0, 0);

  cameraPhi = 0;
  cameraTheta = 0;
  cameraDistance = 1;

  cameraPhiStart;
  cameraThetaStart;

  get cameraPosition() {
    const position = new Vector3(
      -Math.cos(this.cameraPhi) * Math.cos(this.cameraTheta) * this.cameraDistance,
      -Math.sin(this.cameraTheta) * this.cameraDistance,
      Math.sin(this.cameraPhi) *  Math.cos(this.cameraTheta) * this.cameraDistance
    );
    return position;
  }

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

  handleManipulationBegin() {
    this.cameraPhiStart = this.cameraPhi;
    this.cameraThetaStart = this.cameraTheta;
  }

  handleManipulationUpdate(position: Vector2) {
    this.cameraPhi = this.cameraPhiStart + position.x * 10;
    this.cameraTheta = this.cameraThetaStart + position.y * 10;
  }

  handleManipulationEnd() {
    this.cameraPhiStart = null;
    this.cameraThetaStart = null;
  }
}
