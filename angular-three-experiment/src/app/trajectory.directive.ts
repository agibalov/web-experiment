import {Geometry, Line, LineBasicMaterial, Scene, Vector3} from 'three';
import {Directive, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {Sample} from './lorentz.service';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'trajectory'
})
export class TrajectoryDirective implements OnInit, OnDestroy {
  private geometry: Geometry = new Geometry();
  private line: Line;

  constructor(private scene: Scene) {
    const material = new LineBasicMaterial({
      color: 0x00ff00
    });
    this.line = new Line(this.geometry, material);
  }

  @Input() set samples(samples: Sample[]) {
    this.geometry.vertices = [];
    this.geometry.verticesNeedUpdate = true;

    for (let i = 0; i < samples.length - 1; ++i) {
      const currentSample = samples[i];
      const nextSample = samples[i + 1];

      this.geometry.vertices.push(currentSample.position);
      this.geometry.vertices.push(nextSample.position);
    }
  }

  ngOnInit(): void {
    this.scene.add(this.line);
  }

  ngOnDestroy(): void {
    this.scene.remove(this.line);
  }
}
