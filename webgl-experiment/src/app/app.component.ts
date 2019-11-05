import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { mat4 } from 'gl-matrix';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
    @ViewChild('canvas1', {static: false}) canvasRef: ElementRef;

    ngAfterViewInit(): void {
        const canvas = this.canvasRef.nativeElement as HTMLCanvasElement;
        const context = canvas.getContext('webgl') as WebGLRenderingContext;

        const vertexShader = context.createShader(context.VERTEX_SHADER);
        context.shaderSource(vertexShader, `
            attribute vec3 Position;
            
            uniform mat4 u_ModelViewMatrix;
            uniform mat4 u_PerspectiveMatrix;
            
            void main(void) {
                gl_Position = u_PerspectiveMatrix * u_ModelViewMatrix * vec4(Position, 1.0);
            }
        `);
        context.compileShader(vertexShader);
        if (!context.getShaderParameter(vertexShader, context.COMPILE_STATUS)) {
            throw new Error('Failed to compile vertex shader');
        }

        const fragmentShader = context.createShader(context.FRAGMENT_SHADER);
        context.shaderSource(fragmentShader, `
            precision mediump float;
            
            void main(void) {
                gl_FragColor = vec4(0.9, 0.3, 0.6, 1.0);
            }
        `);
        context.compileShader(fragmentShader);
        if (!context.getShaderParameter(fragmentShader, context.COMPILE_STATUS)) {
            throw new Error('Failed to compile fragment shader');
        }

        const program = context.createProgram();
        context.attachShader(program, fragmentShader);
        context.attachShader(program, vertexShader);
        context.linkProgram(program);
        if (!context.getProgramParameter(program, context.LINK_STATUS)) {
            throw new Error('Failed to link program');
        }

        context.useProgram(program);

        const positionLocation = context.getAttribLocation(program, 'Position');
        context.enableVertexAttribArray(positionLocation);

        const perspectiveLocation = context.getUniformLocation(program, 'u_PerspectiveMatrix');
        const modelViewLocation = context.getUniformLocation(program, 'u_ModelViewMatrix');

        const triangleVertexPositionBuffer = context.createBuffer();
        context.bindBuffer(context.ARRAY_BUFFER, triangleVertexPositionBuffer);
        context.bufferData(context.ARRAY_BUFFER, new Float32Array([
            0, 1, 0,
            -1, -1, 0,
            1, -1, 0
        ]), context.STATIC_DRAW);
        const triangleVertexPositionBufferItemSize = 3;
        const triangleVertexPositionBufferNumItems = 3;

        context.clearColor(0.5, 0.5, 0.5, 1);
        context.enable(context.DEPTH_TEST);

        context.viewport(0, 0, canvas.width, canvas.height);
        context.clear(context.COLOR_BUFFER_BIT | context.DEPTH_BUFFER_BIT);

        const perspectiveMatrix = mat4.create();
        mat4.perspective(perspectiveMatrix, 45, canvas.width / canvas.height, 0.1, 100.0);

        const modelViewMatrix = mat4.create();
        mat4.fromTranslation(modelViewMatrix, [0, 0, -4]);

        context.bindBuffer(context.ARRAY_BUFFER, triangleVertexPositionBuffer);
        context.vertexAttribPointer(positionLocation, triangleVertexPositionBufferItemSize, context.FLOAT, false, 0, 0);

        context.uniformMatrix4fv(perspectiveLocation, false, perspectiveMatrix);
        context.uniformMatrix4fv(modelViewLocation, false, modelViewMatrix);

        context.drawArrays(context.TRIANGLES, 0, triangleVertexPositionBufferNumItems);
    }
}
