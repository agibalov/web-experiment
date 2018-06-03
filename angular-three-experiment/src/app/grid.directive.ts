import {Geometry, Line, LineBasicMaterial, Scene, Vector3} from 'three';
import {Directive, Inject, OnDestroy, OnInit} from '@angular/core';
import {SceneDirective} from './scene.directive';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'grid'
})
export class GridDirective implements OnInit, OnDestroy {
  private line: Line;

  constructor(private scene: Scene) {
    const geometry = new Geometry();
    for (let i = -200; i <= 200; ++i) {
      geometry.vertices.push(new Vector3(-200, 0, i));
      geometry.vertices.push(new Vector3(200, 0, i));
      geometry.vertices.push(new Vector3(i, 0, -200));
      geometry.vertices.push(new Vector3(i, 0, 200));
    }

    const material = new LineBasicMaterial({
      color: 0x7766ff
    });
    this.line = new Line(geometry, material);
  }

  ngOnInit(): void {
    this.scene.add(this.line);
  }

  ngOnDestroy(): void {
    this.scene.remove(this.line);
  }
}
