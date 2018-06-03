import {Scene} from 'three';
import {ThreeDirective} from './three.directive';
import {Directive, Inject, OnDestroy, OnInit} from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'scene',
  providers: [
    {
      provide: Scene,
      useFactory: () => new Scene()
    }
  ]
})
export class SceneDirective implements OnInit, OnDestroy {
  constructor(
    @Inject(ThreeDirective) private threeDirective: ThreeDirective,
    private scene: Scene) {
  }

  ngOnInit(): void {
    this.threeDirective.setScene(this.scene);
  }

  ngOnDestroy(): void {
    this.threeDirective.setScene(null);
  }
}
