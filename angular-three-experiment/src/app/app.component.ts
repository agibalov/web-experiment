import {
    Component, Directive, ElementRef, HostListener, Inject, Input, OnChanges, OnDestroy, OnInit,
    SimpleChanges
} from '@angular/core';
import {
    BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, Vector3,
    WebGLRenderer
} from "three";

@Directive({
    selector: '[three]'
})
export class ThreeDirective implements OnInit, OnDestroy {
    private resizePollHandle: number;
    camera: PerspectiveCamera;
    private scene: Scene;
    private renderer: WebGLRenderer;

    constructor(private element: ElementRef) {
        this.scene = new Scene();

        const geometry = new BoxGeometry(0.2, 0.2, 0.2);
        const material = new MeshBasicMaterial({
            color: 0xff0000
        });

        const mesh = new Mesh(geometry, material);
        this.scene.add(mesh);

        this.renderer = new WebGLRenderer({
            antialias: true,
            canvas: element.nativeElement
        });
    }

    ngOnInit(): void {
        this.resizePollHandle = setInterval(() => {
            const canvas = this.element.nativeElement;
            const { clientWidth, clientHeight } = canvas;
            const sizeHaveChanged =
                canvas.width != clientWidth ||
                canvas.height != clientHeight;

            if(sizeHaveChanged) {
                console.log('sizeHaveChanged', clientWidth, clientHeight);

                canvas.width = clientWidth;
                canvas.height = clientHeight;
                this.renderer.setSize(clientWidth, clientHeight, false);
                this.camera.aspect = clientWidth / clientHeight;
                this.camera.updateProjectionMatrix();

                this.render();
            }
        }, 1000);
    }

    ngOnDestroy(): void {
        clearInterval(this.resizePollHandle);
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }
}

@Directive({
    selector: 'camera'
})
export class CameraDirective implements OnChanges {
    @Input() position: Vector3;
    @Input() target: Vector3;

    private camera: PerspectiveCamera;

    constructor(
        @Inject(ThreeDirective) private threeDirective: ThreeDirective) {

        this.camera = new PerspectiveCamera(70);
        this.threeDirective.camera = this.camera;
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log('CameraDirective changes', changes);

        this.camera.position.set(this.position.x, this.position.y, this.position.z);
        this.camera.lookAt(new Vector3(this.target.x, this.target.y, this.target.z));
        this.threeDirective.render();
    }
}

@Component({
    selector: 'app-root',
    template: `
        <button type="button" (click)="move({x: -0.05, y: 0, z: 0})">Left</button>
        <button type="button" (click)="move({x: +0.05, y: 0, z: 0})">Right</button>
        <br>
        <canvas style="border: 1px solid red; width:100%; height:50vh;" three (mousemove)="handleMouseMove($event)">
            <camera [target]="cameraTarget" [position]="cameraPosition"></camera>
        </canvas>
    `
})
export class AppComponent {
    cameraTarget = new Vector3(0, 0, 0);
    cameraPosition = new Vector3(0, 0, 0.5);

    move(delta: Vector3) {
        this.cameraPosition = new Vector3(
            this.cameraPosition.x + delta.x,
            this.cameraPosition.y + delta.y,
            this.cameraPosition.z + delta.z);
    }

    handleMouseMove(event: {x: number, y: number}) {
        this.cameraPosition = new Vector3(Math.cos(event.x / 100) * 0.5, 0, Math.sin(event.x / 100) * 0.3);
    }
}
