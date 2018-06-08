import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AppComponent} from './app.component';
import {ThreeDirective} from './three.directive';
import {CameraDirective} from './camera.directive';
import {SceneDirective} from './scene.directive';
import {ElectronDirective} from './electron.directive';
import {ManipulatorDirective} from './manipulator.directive';
import {GridDirective} from './grid.directive';
import {LightDirective} from './light.directive';
import {FormsModule} from '@angular/forms';
import {VectorEditorComponent} from './vector-editor.component';
import {TrajectoryDirective} from './trajectory.directive';
import {ExponentialPipe} from './exponential.pipe';
import {AxesDirective} from './axes.directive';

@NgModule({
  declarations: [
    AppComponent,
    ThreeDirective,
    CameraDirective,
    SceneDirective,
    ElectronDirective,
    ManipulatorDirective,
    GridDirective,
    LightDirective,
    VectorEditorComponent,
    TrajectoryDirective,
    ExponentialPipe,
    AxesDirective
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
