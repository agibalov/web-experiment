(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/app.component.html":
/*!**************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/app.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<canvas #canvas1 width=\"800\" height=\"600\"></canvas>\n"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "canvas {\n  border: 1px solid #000;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FhZ2liYWxvdi93ZWItZXhwZXJpbWVudC93ZWJnbC1leHBlcmltZW50L3NyYy9hcHAvYXBwLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9hcHAuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxzQkFBQTtBQ0NGIiwiZmlsZSI6InNyYy9hcHAvYXBwLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiY2FudmFzIHtcbiAgYm9yZGVyOiAxcHggc29saWQgIzAwMDtcbn1cbiIsImNhbnZhcyB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICMwMDA7XG59Il19 */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gl-matrix */ "./node_modules/gl-matrix/esm/index.js");



var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.startTimestamp = null;
    }
    AppComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        var canvas = this.canvasRef.nativeElement;
        this.width = canvas.width;
        this.height = canvas.height;
        var gl = canvas.getContext('webgl');
        var cubeVertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(cubeVertexShader, "\n            attribute vec3 Position;\n            attribute vec4 Color;\n            \n            uniform mat4 u_ModelViewMatrix;\n            uniform mat4 u_PerspectiveMatrix;\n            \n            varying lowp vec4 vColor;\n            \n            void main(void) {\n                gl_Position = u_PerspectiveMatrix * u_ModelViewMatrix * vec4(Position, 1.0);\n                vColor = Color;\n            }\n        ");
        gl.compileShader(cubeVertexShader);
        if (!gl.getShaderParameter(cubeVertexShader, gl.COMPILE_STATUS)) {
            throw new Error('Failed to compile vertex shader');
        }
        var cubeFragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(cubeFragmentShader, "\n            varying lowp vec4 vColor;\n            \n            void main(void) {\n                gl_FragColor = vColor;\n            }\n        ");
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
        var screenVertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(screenVertexShader, "\n            attribute vec3 Position;\n            attribute vec2 TexCoord;\n            \n            varying vec2 v_TexCoord;\n\n            void main(void) {\n                gl_Position = vec4(Position, 1.0);\n                v_TexCoord = TexCoord;\n            }\n        ");
        gl.compileShader(screenVertexShader);
        if (!gl.getShaderParameter(screenVertexShader, gl.COMPILE_STATUS)) {
            throw new Error('Failed to compile vertex shader');
        }
        var screenFragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(screenFragmentShader, "\n            precision mediump float;\n            \n            varying vec2 v_TexCoord;\n            uniform sampler2D u_Texture;\n            uniform float u_Time;\n            \n            float random(vec2 v) {\n                return fract(sin(dot(v.xy, vec2(12.9898, 78.233)))*43758.5453123);\n            }\n            \n            void main(void) {     \n                const float blurRadius = 0.03;\n                const float blurStep = 0.005;\n                          \n                vec4 sum = vec4(0);\n                float count = 0.0;                \n                for (float x = -blurRadius; x <= blurRadius; x += blurStep) {\n                    for (float y = -blurRadius; y <= blurRadius; y += blurStep) {\n                        ++count;\n                        sum += texture2D(u_Texture, vec2(v_TexCoord.x + x, v_TexCoord.y + y));\n                    }\n                }\n                \n                vec4 average = sum / count;\n                \n                average = max(average, texture2D(u_Texture, vec2(v_TexCoord.x, v_TexCoord.y)));                \n                average = max(average, vec4(\n                    0.3 + 0.2 * abs(sin(u_Time / 1713.0)), \n                    0.3 + 0.2 * abs(sin(u_Time / 9871.0)), \n                    0, \n                    1));\n                \n                vec4 noise = vec4(vec3(random(v_TexCoord + vec2(\n                    v_TexCoord.x + fract(u_Time), \n                    v_TexCoord.y + fract(u_Time)\n                ))), 1.0);\n                \n                float noiseWeight = 0.4 + 0.3 * sin(u_Time / 2735.0);              \n                gl_FragColor = average * (1.0 - noiseWeight + noiseWeight * noise);\n            }\n        ");
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
        var depthBuffer = gl.createRenderbuffer();
        gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer);
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.width, this.height);
        this.framebuffer = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.targetTexture, 0);
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthBuffer);
        requestAnimationFrame(function (timestamp) { return _this.render(gl, timestamp); });
    };
    AppComponent.prototype.render = function (gl, timestamp) {
        var _this = this;
        if (this.startTimestamp === null) {
            this.startTimestamp = timestamp;
        }
        var elapsedTime = timestamp - this.startTimestamp;
        var perspectiveMatrix = gl_matrix__WEBPACK_IMPORTED_MODULE_2__["mat4"].create();
        gl_matrix__WEBPACK_IMPORTED_MODULE_2__["mat4"].perspective(perspectiveMatrix, 45, this.width / this.height, 0.1, 100.0);
        var modelViewMatrix = gl_matrix__WEBPACK_IMPORTED_MODULE_2__["mat4"].create();
        gl_matrix__WEBPACK_IMPORTED_MODULE_2__["mat4"].lookAt(modelViewMatrix, [
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
        requestAnimationFrame(function (timestamp) { return _this.render(gl, timestamp); });
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('canvas1', { static: false })
    ], AppComponent.prototype, "canvasRef", void 0);
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! raw-loader!./app.component.html */ "./node_modules/raw-loader/index.js!./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");




var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"]
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/aagibalov/web-experiment/webgl-experiment/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es5.js.map