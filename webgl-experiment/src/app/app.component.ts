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

    cubeProgram: WebGLProgram;
    cubeVertexPositionBuffer: WebGLBuffer;
    cubeVertexColorBuffer: WebGLBuffer;
    cubeVertexIndexBuffer: WebGLBuffer;
    cubePositionLocation: number;
    cubeColorLocation: number;
    cubePerspectiveLocation: WebGLUniformLocation;
    cubeModelViewLocation: WebGLUniformLocation;

    screenProgram: WebGLProgram;
    screenVertexPositionBuffer: WebGLBuffer;
    screenPositionLocation: number;
    screenTexCoordBuffer: WebGLBuffer;
    screenTexCoordLocation: number;
    screenTextureLocation: WebGLUniformLocation;
    screenTimeLocation: WebGLUniformLocation;

    targetTexture: WebGLTexture;
    framebuffer: WebGLFramebuffer;

    ngAfterViewInit(): void {
        const canvas = this.canvasRef.nativeElement as HTMLCanvasElement;
        this.width = canvas.width;
        this.height = canvas.height;

        const gl = canvas.getContext('webgl') as WebGLRenderingContext;

        const cubeVertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(cubeVertexShader, `
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
        gl.compileShader(cubeVertexShader);
        if (!gl.getShaderParameter(cubeVertexShader, gl.COMPILE_STATUS)) {
            throw new Error('Failed to compile vertex shader');
        }

        const cubeFragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(cubeFragmentShader, `
            varying lowp vec4 vColor;
            
            void main(void) {
                gl_FragColor = vColor;
            }
        `);
        gl.compileShader(cubeFragmentShader);
        if (!gl.getShaderParameter(cubeFragmentShader, gl.COMPILE_STATUS)) {
            throw new Error('Failed to compile fragment shader');
        }

        this.cubeProgram = gl.createProgram();
        gl.attachShader(this.cubeProgram, cubeVertexShader);
        gl.attachShader(this.cubeProgram, cubeFragmentShader);
        gl.linkProgram(this.cubeProgram);
        if (!gl.getProgramParameter(this.cubeProgram, gl.LINK_STATUS)) {
            throw new Error('Failed to link cubeProgram');
        }

        this.cubePositionLocation = gl.getAttribLocation(this.cubeProgram, 'Position');
        this.cubeColorLocation = gl.getAttribLocation(this.cubeProgram, 'Color');
        this.cubePerspectiveLocation = gl.getUniformLocation(this.cubeProgram, 'u_PerspectiveMatrix');
        this.cubeModelViewLocation = gl.getUniformLocation(this.cubeProgram, 'u_ModelViewMatrix');

        this.cubeVertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.cubeVertexPositionBuffer);
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

        this.cubeVertexColorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.cubeVertexColorBuffer);
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

        this.cubeVertexIndexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.cubeVertexIndexBuffer);
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

        //////////////
        const screenVertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(screenVertexShader, `
            attribute vec3 Position;
            attribute vec2 TexCoord;
            
            varying vec2 v_TexCoord;

            void main(void) {
                gl_Position = vec4(Position, 1.0);
                v_TexCoord = TexCoord;
            }
        `);
        gl.compileShader(screenVertexShader);
        if (!gl.getShaderParameter(screenVertexShader, gl.COMPILE_STATUS)) {
            throw new Error('Failed to compile vertex shader');
        }

        const screenFragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(screenFragmentShader, `
            precision mediump float;
            
            varying vec2 v_TexCoord;
            uniform sampler2D u_Texture;
            uniform float u_Time;
            
            float random(vec2 v) {
                return fract(sin(dot(v.xy, vec2(12.9898, 78.233)))*43758.5453123);
            }
            
            void main(void) {     
                const float blurRadius = 0.03;
                const float blurStep = 0.005;
                          
                vec4 sum = vec4(0);
                float count = 0.0;                
                for (float x = -blurRadius; x <= blurRadius; x += blurStep) {
                    for (float y = -blurRadius; y <= blurRadius; y += blurStep) {
                        ++count;
                        sum += texture2D(u_Texture, vec2(v_TexCoord.x + x, v_TexCoord.y + y));
                    }
                }
                
                vec4 average = sum / count;
                
                average = max(average, texture2D(u_Texture, vec2(v_TexCoord.x, v_TexCoord.y)));                
                average = max(average, vec4(
                    0.3 + 0.2 * abs(sin(u_Time / 1713.0)), 
                    0.3 + 0.2 * abs(sin(u_Time / 9871.0)), 
                    0, 
                    1));
                
                vec4 noise = vec4(vec3(random(v_TexCoord + vec2(
                    v_TexCoord.x + fract(u_Time), 
                    v_TexCoord.y + fract(u_Time)
                ))), 1.0);
                
                float noiseWeight = 0.4 + 0.3 * sin(u_Time / 2735.0);              
                gl_FragColor = average * (1.0 - noiseWeight + noiseWeight * noise);
            }
        `);
        gl.compileShader(screenFragmentShader);
        if (!gl.getShaderParameter(screenFragmentShader, gl.COMPILE_STATUS)) {
            throw new Error('Failed to compile fragment shader');
        }

        this.screenProgram = gl.createProgram();
        gl.attachShader(this.screenProgram, screenVertexShader);
        gl.attachShader(this.screenProgram, screenFragmentShader);
        gl.linkProgram(this.screenProgram);
        if (!gl.getProgramParameter(this.screenProgram, gl.LINK_STATUS)) {
            throw new Error('Failed to link screenProgram');
        }

        this.screenPositionLocation = gl.getAttribLocation(this.screenProgram, 'Position');
        this.screenTexCoordLocation = gl.getAttribLocation(this.screenProgram, 'TexCoord');
        this.screenTextureLocation = gl.getUniformLocation(this.screenProgram, 'u_Texture');
        this.screenTimeLocation = gl.getUniformLocation(this.screenProgram, 'u_Time');

        this.screenVertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.screenVertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            -1, -1, 0,
            1, -1, 0,
            -1, 1, 0,
            -1, 1, 0,
            1, -1, 0,
            1, 1, 0
        ]), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);

        this.screenTexCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.screenTexCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            0, 0,
            1, 0,
            0, 1,
            0, 1,
            1, 0,
            1, 1
        ]), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);

        this.targetTexture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.targetTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.width, this.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        const depthBuffer = gl.createRenderbuffer();
        gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer);
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.width, this.height);

        this.framebuffer = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.targetTexture, 0);
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthBuffer);

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
        mat4.lookAt(modelViewMatrix, [
            Math.cos(elapsedTime / 1337) * 4,
            Math.sin(elapsedTime / 3133) * 4,
            Math.sin(elapsedTime / 7311) * 4
        ], [0, 0, 0], [
            Math.sin(elapsedTime / 731),
            Math.cos(elapsedTime / 137),
            Math.cos(elapsedTime / 313)
        ]);

        // scene to framebuffer
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);

        gl.clearColor(0.2, 0.2, 0.2, 1);

        gl.enable(gl.DEPTH_TEST);

        gl.viewport(0, 0, this.width, this.height);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.useProgram(this.cubeProgram);
        gl.uniformMatrix4fv(this.cubePerspectiveLocation, false, perspectiveMatrix);
        gl.uniformMatrix4fv(this.cubeModelViewLocation, false, modelViewMatrix);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.cubeVertexPositionBuffer);
        gl.vertexAttribPointer(this.cubePositionLocation, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.cubePositionLocation);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.cubeVertexColorBuffer);
        gl.vertexAttribPointer(this.cubeColorLocation, 4, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.cubeColorLocation);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.cubeVertexIndexBuffer);
        gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        gl.disableVertexAttribArray(this.cubeColorLocation);
        gl.disableVertexAttribArray(this.cubePositionLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);

        // framebuffer to screen
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.clearColor(0, 1, 0, 1);
        gl.viewport(0, 0, this.width, this.height);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.useProgram(this.screenProgram);
        gl.bindTexture(gl.TEXTURE_2D, this.targetTexture);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.screenVertexPositionBuffer);
        gl.vertexAttribPointer(this.screenPositionLocation, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.screenPositionLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.screenTexCoordBuffer);
        gl.vertexAttribPointer(this.screenTexCoordLocation, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.screenTexCoordLocation);
        gl.uniform1i(this.screenTextureLocation, 0);
        gl.uniform1f(this.screenTimeLocation, elapsedTime);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        gl.disableVertexAttribArray(this.screenPositionLocation);
        gl.disableVertexAttribArray(this.screenTexCoordLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindTexture(gl.TEXTURE_2D, null);

        requestAnimationFrame(timestamp => this.render(gl, timestamp));
    }
}
