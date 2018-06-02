import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AppComponent} from './app.component';
import {ThreeDirective} from './three.directive';
import {CameraDirective} from './camera.directive';
import {SceneDirective} from './scene.directive';
import {DummyDirective} from './dummy.directive';
import {ManipulatorDirective} from './manipulator.directive';
import {GridDirective} from './grid.directive';

@NgModule({
  declarations: [
    AppComponent,
    ThreeDirective,
    CameraDirective,
    SceneDirective,
    DummyDirective,
    ManipulatorDirective,
    GridDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
