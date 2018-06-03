import {Scene} from 'three';
import {ThreeDirective} from './three.directive';
import {Directive, Inject, OnDestroy, OnInit} from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'scene'
})
export class SceneDirective implements OnInit, OnDestroy {
  scene: Scene = new Scene();

  constructor(@Inject(ThreeDirective) private threeDirective: ThreeDirective) {
  }

  ngOnInit(): void {
    this.threeDirective.setScene(this.scene);
  }

  ngOnDestroy(): void {
    this.threeDirective.setScene(null);
  }
}
