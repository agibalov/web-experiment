import {Component} from '@angular/core';
import {Vector3} from 'three';
import {CameraDriver} from './camera-driver';

@Component({
  selector: 'app-root',
  // tslint:disable:no-trailing-whitespace
  template: `
    <canvas style="width: 100%; height: 600px;" 
            manipulator
            (manipulationBegin)="cameraDriver.handleManipulationBegin()"
            (manipulationRotationUpdate)="cameraDriver.handleRotationUpdate($event)"
            (manipulationTranslationUpdate)="cameraDriver.handleTranslationUpdate($event)"
            (manipulationEnd)="cameraDriver.handleManipulationEnd()"
            three>
      <camera [position]="cameraDriver.cameraPosition" [target]="cameraDriver.cameraTarget" fov="60" #theCamera></camera>
      <scene>
        <light [position]="cameraDriver.cameraPosition" [target]="cameraDriver.cameraTarget"></light>
        <dummy *ngIf="showDummy" [position]="dummyPosition"></dummy>
        <dummy *ngIf="showDummy" [position]="dummyPosition2"></dummy>
        <grid></grid>
      </scene>
    </canvas>
    <button (click)="showHideDummy()">Show/hide dummy</button>
    <button (click)="toggleDummyPosition()">Toggle dummy position</button>
    <pre>{{cameraDriver | json}}</pre>
  `,
  // tslint:enable:no-trailing-whitespace
  styles: [``]
})
export class AppComponent {
  dummyPosition: Vector3 = new Vector3(-0.1, 0, 0);
  dummyPosition2: Vector3 = new Vector3(1, 0, 0);
  showDummy = true;
  cameraDriver = new CameraDriver();

  toggleDummyPosition() {
    this.dummyPosition = new Vector3(-this.dummyPosition.x, this.dummyPosition.y, this.dummyPosition.z);
    this.dummyPosition2 = new Vector3(-this.dummyPosition2.x, this.dummyPosition2.y, this.dummyPosition2.z);
  }

  showHideDummy() {
    this.showDummy = !this.showDummy;
  }
}
