import {
  ConeGeometry,
  CylinderGeometry,
  Group,
  Mesh,
  MeshLambertMaterial,
  Scene
} from 'three';
import {Directive, OnDestroy, OnInit} from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'axes'
})
export class AxesDirective implements OnInit, OnDestroy {
  private readonly cylinderMaterial = new MeshLambertMaterial({
    color: 0xff0000
  });
  private readonly coneMaterial = new MeshLambertMaterial({
    color: 0x00ff00
  });
  private readonly group: Group;

  constructor(private scene: Scene) {
    this.group = new Group();
    this.group.add(this.makeAxis().rotateZ(-Math.PI / 2));
    this.group.add(this.makeAxis());
    this.group.add(this.makeAxis().rotateX(Math.PI / 2));
  }

  ngOnInit(): void {
    this.scene.add(this.group);
  }

  ngOnDestroy(): void {
    this.scene.remove(this.group);
  }

  private makeAxis(): Group {
    const cylinderHeight = 1;
    const cylinderGeometry = new CylinderGeometry(0.01, 0.01, cylinderHeight, 8, 1);
    const cylinderMesh = new Mesh(cylinderGeometry, this.cylinderMaterial);

    const coneHeight = 0.1;
    const coneGeometry = new ConeGeometry(0.03, coneHeight, 8, 1);
    coneGeometry.translate(0, cylinderHeight / 2 + coneHeight / 2, 0);
    const coneMesh = new Mesh(coneGeometry, this.coneMaterial);

    const group = new Group();
    group.add(cylinderMesh);
    group.add(coneMesh);

    return group;
  }
}
