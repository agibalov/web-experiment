import {DirectionalLight, Vector3} from 'three';
import {Directive, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {SceneDirective} from './scene.directive';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'light'
})
export class LightDirective implements OnInit, OnDestroy {
  private light = new DirectionalLight(0xffffffff);

  constructor(@Inject(SceneDirective) private sceneDirective: SceneDirective) {
  }

  @Input() set position(value: Vector3) {
    this.light.position.set(value.x, value.y, value.z);
  }

  @Input() set target(value: Vector3) {
    this.light.target.position.set(value.x, value.y, value.z);
  }

  ngOnInit(): void {
    this.sceneDirective.scene.add(this.light);
    this.sceneDirective.scene.add(this.light.target);
  }

  ngOnDestroy(): void {
    this.sceneDirective.scene.remove(this.light);
    this.sceneDirective.scene.remove(this.light.target);
  }
}
