import {Component} from '@angular/core';
import {Vector3} from 'three';
import {CameraDriver} from './camera-driver';
import {LorentzService} from './lorentz.service';

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
                (manipulationZoomUpdate)="cameraDriver.handleZoomUpdate($event)"
                (manipulationEnd)="cameraDriver.handleManipulationEnd()"
                three #three="three">
          <camera [position]="cameraDriver.cameraPosition" [target]="cameraDriver.cameraTarget" fov="60"></camera>
          <scene>
            <light [position]="cameraDriver.cameraPosition" [target]="cameraDriver.cameraTarget"></light>
            <dummy *ngIf="showDummy" [position]="dummyPosition"></dummy>
            <trajectory *ngIf="showTrajectory" [samples]="lorentzService.trajectory"></trajectory>
            <grid *ngIf="showGrid"></grid>
          </scene>
        </canvas>
      </div>
      <div class="column is-one-third is-one-fifth-widescreen">
        <vector-editor name="Start Velocity" [range]="1e6" [(ngModel)]="lorentzService.startVelocity"></vector-editor>
        <vector-editor name="Electric Field" [range]="1e-5" [(ngModel)]="lorentzService.electricField"></vector-editor>
        <vector-editor name="Magnetic Field" [range]="1e-10" [(ngModel)]="lorentzService.magneticField"></vector-editor>
        <vector-editor name="Dummy Position" [range]="2.0" [(ngModel)]="dummyPosition"></vector-editor>

        <pre class="checkboxes">

<label class="checkbox"><input type="checkbox" [(ngModel)]="showDummy"> Show dummy</label>
<label class="checkbox"><input type="checkbox" [(ngModel)]="showTrajectory"> Show trajectory</label>
<label class="checkbox"><input type="checkbox" [(ngModel)]="showGrid"> Show grid</label>
        </pre>

        <pre class="debug">{{cameraDriver | json}}</pre>
      </div>
    </div>
  `,
  // tslint:enable:no-trailing-whitespace
  styles: [`
    .checkboxes {
      padding: 0;
      margin: 0;
    }
    
    .debug {
      padding: 0;
      margin: 0;
      font-size: 10px;
    }
  `]
})
export class AppComponent {
  lorentzService = new LorentzService();
  dummyPosition: Vector3 = new Vector3(-0.1, 0, 0);
  showDummy = true;
  showTrajectory = true;
  showGrid = true;
  cameraDriver = new CameraDriver();
}
