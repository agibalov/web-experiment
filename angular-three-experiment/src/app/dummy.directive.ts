import {Mesh, MeshLambertMaterial, SphereGeometry, Vector3} from 'three';
import {Directive, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {SceneDirective} from './scene.directive';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'dummy'
})
export class DummyDirective implements OnInit, OnDestroy {
  private mesh: Mesh;

  constructor(@Inject(SceneDirective) private sceneDirective: SceneDirective) {
    const geometry = new SphereGeometry(0.2, 7, 7);
    const material = new MeshLambertMaterial({
      color: 0xff0000
    });
    this.mesh = new Mesh(geometry, material);
  }

  @Input() set position(position: Vector3) {
    this.mesh.position.set(position.x, position.y, position.z);
  }

  ngOnInit(): void {
    this.sceneDirective.scene.add(this.mesh);
  }

  ngOnDestroy(): void {
    this.sceneDirective.scene.remove(this.mesh);
  }
}
