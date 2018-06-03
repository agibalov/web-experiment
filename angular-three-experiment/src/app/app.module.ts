import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AppComponent} from './app.component';
import {ThreeDirective} from './three.directive';
import {CameraDirective} from './camera.directive';
import {SceneDirective} from './scene.directive';
import {DummyDirective} from './dummy.directive';
import {ManipulatorDirective} from './manipulator.directive';
import {GridDirective} from './grid.directive';
import {LightDirective} from './light.directive';
import {FormsModule} from '@angular/forms';
import {VectorEditorComponent} from './vector-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    ThreeDirective,
    CameraDirective,
    SceneDirective,
    DummyDirective,
    ManipulatorDirective,
    GridDirective,
    LightDirective,
    VectorEditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
