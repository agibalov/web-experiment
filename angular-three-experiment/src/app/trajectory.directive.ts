import {BufferGeometry, Float32BufferAttribute, Line, LineBasicMaterial, Scene} from 'three';
import {Directive, Input, OnDestroy, OnInit} from '@angular/core';
import {Sample} from './lorentz.service';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'trajectory'
})
export class TrajectoryDirective implements OnInit, OnDestroy {
  private readonly scale = 1e-5;
  private geometry: BufferGeometry = new BufferGeometry();
  private positionAttribute: Float32BufferAttribute;
  private line: Line;

  constructor(private scene: Scene) {
    this.positionAttribute = new Float32BufferAttribute(new Float32Array(3 * 5000), 3);
    this.positionAttribute.setDynamic(true);
    this.geometry.addAttribute('position', this.positionAttribute);

    const material = new LineBasicMaterial({
      color: 0x00ff00
    });
    this.line = new Line(this.geometry, material);
    this.line.scale.set(this.scale, this.scale, this.scale);
  }

  @Input() set samples(samples: Sample[]) {
    this.positionAttribute.copyVector3sArray(samples.map(s => s.position));
    this.positionAttribute.needsUpdate = true;
    this.geometry.setDrawRange(0, samples.length);
  }

  ngOnInit(): void {
    this.scene.add(this.line);
  }

  ngOnDestroy(): void {
    this.scene.remove(this.line);
  }
}
