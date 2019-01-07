import {Component, Inject} from '@angular/core';
import {DummyAngulartics2Backend} from "./dummy-angulartics2-backend.service";

@Component({
    selector: 'app-root',
    template: `
        <h1>Dummy app</h1>
        <p><a routerLink="/">Home</a> | <a routerLink="/page2">Page2</a></p>
        <router-outlet></router-outlet>
    `
})
export class AppComponent {
    constructor(@Inject(DummyAngulartics2Backend) dummyAngulartics2Backend: DummyAngulartics2Backend) {}
}
