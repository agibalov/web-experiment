import {PerspectiveCamera, Vector3} from 'three';
import {Directive, Inject, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {ThreeDirective} from './three.directive';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'camera'
})
export class CameraDirective implements OnInit, OnDestroy, OnChanges {
  @Input() position: Vector3;
  @Input() target: Vector3;
  @Input() fov: number;

  private camera: PerspectiveCamera = new PerspectiveCamera(70);

  constructor(@Inject(ThreeDirective) private threeDirective: ThreeDirective) {
  }

  ngOnInit(): void {
    this.threeDirective.setCamera(this.camera);
  }

  ngOnDestroy(): void {
    this.threeDirective.setCamera(null);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.fov) {
      this.camera.fov = this.fov;
      this.camera.updateProjectionMatrix();
    }

    if (changes.position || changes.target) {
      this.camera.position.set(this.position.x, this.position.y, this.position.z);
      this.camera.lookAt(new Vector3(this.target.x, this.target.y, this.target.z));
    }
  }
}
