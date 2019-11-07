import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { mat4 } from 'gl-matrix';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
    @ViewChild('canvas1', {static: false}) canvasRef: ElementRef;
    width: number;
    height: number;
    vertexPositionBuffer: WebGLBuffer;
    vertexColorBuffer: WebGLBuffer;
    vertexIndexBuffer: WebGLBuffer;
    positionLocation: number;
    colorLocation: number;
    perspectiveLocation: WebGLUniformLocation;
    modelViewLocation: WebGLUniformLocation;

    ngAfterViewInit(): void {
        const canvas = this.canvasRef.nativeElement as HTMLCanvasElement;
        this.width = canvas.width;
        this.height = canvas.height;

        const gl = canvas.getContext('webgl') as WebGLRenderingContext;

        const vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader, `
            attribute vec3 Position;
            attribute vec4 Color;
            
            uniform mat4 u_ModelViewMatrix;
            uniform mat4 u_PerspectiveMatrix;
            
            varying lowp vec4 vColor;
            
            void main(void) {
                gl_Position = u_PerspectiveMatrix * u_ModelViewMatrix * vec4(Position, 1.0);
                vColor = Color;
            }
        `);
        gl.compileShader(vertexShader);
        if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
            throw new Error('Failed to compile vertex shader');
        }

        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragmentShader, `
            varying lowp vec4 vColor;
            
            void main(void) {
                gl_FragColor = vColor;
            }
        `);
        gl.compileShader(fragmentShader);
        if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
            throw new Error('Failed to compile fragment shader');
        }

        const program = gl.createProgram();
        gl.attachShader(program, fragmentShader);
        gl.attachShader(program, vertexShader);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            throw new Error('Failed to link program');
        }

        gl.useProgram(program);

        this.positionLocation = gl.getAttribLocation(program, 'Position');
        this.colorLocation = gl.getAttribLocation(program, 'Color');
        this.perspectiveLocation = gl.getUniformLocation(program, 'u_PerspectiveMatrix');
        this.modelViewLocation = gl.getUniformLocation(program, 'u_ModelViewMatrix');

        this.vertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            -1, -1, -1,
            1, -1, -1,
            1, 1, -1,
            -1, 1, -1,
            -1, -1, 1,
            1, -1, 1,
            1, 1, 1,
            -1, 1, 1
        ]), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);

        this.vertexColorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexColorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            1, 0, 0, 1,
            0, 1, 0, 1,
            0, 0, 1, 1,
            1, 1, 0, 1,
            0, 1, 1, 1,
            1, 0, 1, 1,
            1, 1, 1, 1,
            0, 0, 0, 1
        ]), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);

        this.vertexIndexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.vertexIndexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([
            0, 1, 2,
            0, 2, 3,
            4, 5, 6,
            4, 6, 7,
            2, 1, 5,
            2, 5, 6,
            3, 2, 6,
            3, 6, 7,
            0, 3, 7,
            0, 4, 7,
            1, 0, 4,
            1, 4, 5
        ]), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

        requestAnimationFrame(timestamp => this.render(gl, timestamp));
    }

    startTimestamp: number|null = null;

    render(gl: WebGLRenderingContext, timestamp: number) {
        if (this.startTimestamp === null) {
            this.startTimestamp = timestamp;
        }

        const elapsedTime = timestamp - this.startTimestamp;

        const perspectiveMatrix = mat4.create();
        mat4.perspective(perspectiveMatrix, 45, this.width / this.height, 0.1, 100.0);

        const modelViewMatrix = mat4.create();
        mat4.fromTranslation(modelViewMatrix, [0, 0, -4]);
        mat4.rotate(modelViewMatrix, modelViewMatrix, elapsedTime * 0.001, [0, 0.7, 1]);

        gl.clearColor(0.2, 0.2, 0.2, 1);
        gl.enable(gl.DEPTH_TEST);

        gl.viewport(0, 0, this.width, this.height);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.uniformMatrix4fv(this.perspectiveLocation, false, perspectiveMatrix);
        gl.uniformMatrix4fv(this.modelViewLocation, false, modelViewMatrix);


        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
        gl.vertexAttribPointer(this.positionLocation, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.positionLocation);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexColorBuffer);
        gl.vertexAttribPointer(this.colorLocation, 4, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.colorLocation);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.vertexIndexBuffer);
        gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        gl.disableVertexAttribArray(this.colorLocation);

        gl.disableVertexAttribArray(this.positionLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);

        requestAnimationFrame(timestamp => this.render(gl, timestamp));
    }
}
