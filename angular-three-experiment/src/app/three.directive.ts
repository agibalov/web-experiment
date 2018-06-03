import {AfterContentChecked, Directive, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {Camera, PerspectiveCamera, Scene, WebGLRenderer} from 'three';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[three]',
  exportAs: 'three',
})
export class ThreeDirective implements OnInit, OnDestroy, AfterContentChecked {
  private renderer: WebGLRenderer;
  /*private*/ camera: Camera;
  private scene: Scene;
  private resizePollHandle: number;

  constructor(private element: ElementRef) {
    this.renderer = new WebGLRenderer({
      antialias: true,
      canvas: this.element.nativeElement
    });
    this.renderer.setClearColor(0x000000);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  setCamera(camera: Camera) {
    this.camera = camera;
  }

  setScene(scene: Scene) {
    this.scene = scene;
  }

  ngOnDestroy(): void {
    clearInterval(this.resizePollHandle);
  }

  ngOnInit(): void {
    this.resizePollHandle = setInterval(() => {
      this.updateRendererAndCameraIfNeeded();
    }, 1000);
  }

  ngAfterContentChecked(): void {
    this.updateRendererAndCameraIfNeeded();
    this.render();
  }

  private updateRendererAndCameraIfNeeded() {
    const canvas = this.element.nativeElement;
    const { clientWidth, clientHeight } = canvas;
    const sizeHaveChanged =
      canvas.width !== clientWidth ||
      canvas.height !== clientHeight;

    if (sizeHaveChanged) {
      canvas.width = clientWidth;
      canvas.height = clientHeight;
      this.renderer.setSize(clientWidth, clientHeight, false);

      if (this.camera instanceof PerspectiveCamera) {
        this.camera.aspect = clientWidth / clientHeight;
        this.camera.updateProjectionMatrix();
      }

      this.renderer.render(this.scene, this.camera);
    }
  }
}
