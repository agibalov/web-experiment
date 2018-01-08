import {
    Component, Directive, ElementRef, Inject, Input, OnChanges, OnDestroy, OnInit,
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
        this.render();

        this.resizePollHandle = setInterval(() => {
            const { nativeElement } = this.element;
            const { clientWidth, clientHeight } = nativeElement;
            const sizeHaveChanged =
                nativeElement.width != clientWidth ||
                nativeElement.height != clientHeight;

            if(sizeHaveChanged) {
                nativeElement.width = clientWidth;
                nativeElement.height = clientHeight;
                console.log('Resizing', nativeElement.width, nativeElement.height);
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
    @Input() width: number;
    @Input() height: number;
    @Input() position: Vector3;

    private camera: PerspectiveCamera;

    constructor(
        @Inject(ThreeDirective) private threeDirective: ThreeDirective) {

        this.camera = new PerspectiveCamera(70);
        this.threeDirective.camera = this.camera;
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log('CameraDirective changes', changes);

        const width = changes.width && changes.width.currentValue;
        const height = changes.height && changes.height.currentValue;
        const position = changes.position && changes.position.currentValue;

        if(width != null && height != null) {
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
            this.threeDirective.render();
        }

        if(position != null) {
            this.camera.position.set(position.x, position.y, position.z);
            this.threeDirective.render();
        }
    }
}

@Component({
    selector: 'app-root',
    template: `
        <canvas width="400" height="300" style="border: 1px solid red; width:30%; height:30%;" three>
            <camera [width]="400" [height]="300" [position]="{x:0,y:0,z:0.5}"></camera>
        </canvas>
    `
})
export class AppComponent {
}
