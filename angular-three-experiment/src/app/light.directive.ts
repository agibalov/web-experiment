import {DirectionalLight, Scene, Vector3} from 'three';
import {Directive, Input, OnDestroy, OnInit} from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'light'
})
export class LightDirective implements OnInit, OnDestroy {
  private light = new DirectionalLight(0xffffffff);

  constructor(private scene: Scene) {
  }

  @Input() set position(value: Vector3) {
    this.light.position.set(value.x, value.y, value.z);
  }

  @Input() set target(value: Vector3) {
    this.light.target.position.set(value.x, value.y, value.z);
  }

  ngOnInit(): void {
    this.scene.add(this.light);
    this.scene.add(this.light.target);
  }

  ngOnDestroy(): void {
    this.scene.remove(this.light);
    this.scene.remove(this.light.target);
  }
}
