import {Component} from '@angular/core';
import {Vector3} from 'three';
import {CameraDriver} from './camera-driver';

@Component({
  selector: 'app-root',
  // tslint:disable:no-trailing-whitespace
  template: `
    <div class="columns">
      <div class="column">
        <canvas style="width: 100%; height: 600px;"
                manipulator
                (manipulationBegin)="cameraDriver.handleManipulationBegin(three.camera)"
                (manipulationRotationUpdate)="cameraDriver.handleRotationUpdate($event)"
                (manipulationTranslationUpdate)="cameraDriver.handleTranslationUpdate($event)"
                (manipulationEnd)="cameraDriver.handleManipulationEnd()"
                three #three="three">
          <camera [position]="cameraDriver.cameraPosition" [target]="cameraDriver.cameraTarget" fov="60"></camera>
          <scene>
            <light [position]="cameraDriver.cameraPosition" [target]="cameraDriver.cameraTarget"></light>
            <dummy *ngIf="showDummy" [position]="dummyPosition1"></dummy>
            <dummy *ngIf="showDummy" [position]="dummyPosition2"></dummy>
            <grid></grid>
          </scene>
        </canvas>
      </div>
      <div class="column is-one-third is-one-fifth-widescreen">
        <vector-editor name="dummyPosition1" [range]="2.0" [(ngModel)]="dummyPosition1"></vector-editor>
        <vector-editor name="dummyPosition2" [range]="2.0" [(ngModel)]="dummyPosition2"></vector-editor>

        <div class="buttons">
          <button (click)="showHideDummy()" class="button is-small">Show/hide dummy</button>
          <button (click)="toggleDummyPosition()" class="button is-small">Toggle dummy position</button>
        </div>

        <pre class="debug">{{cameraDriver | json}}</pre>
      </div>
    </div>
  `,
  // tslint:enable:no-trailing-whitespace
  styles: [`
    .debug {
      padding: 0;
      margin: 0;
      font-size: 10px;
    }
  `]
})
export class AppComponent {
  dummyPosition1: Vector3 = new Vector3(-0.1, 0, 0);
  dummyPosition2: Vector3 = new Vector3(1, 0, 0);
  showDummy = true;
  cameraDriver = new CameraDriver();

  toggleDummyPosition() {
    this.dummyPosition1 = new Vector3(-this.dummyPosition1.x, this.dummyPosition1.y, this.dummyPosition1.z);
    this.dummyPosition2 = new Vector3(-this.dummyPosition2.x, this.dummyPosition2.y, this.dummyPosition2.z);
  }

  showHideDummy() {
    this.showDummy = !this.showDummy;
  }
}
