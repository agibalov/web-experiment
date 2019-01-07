import {Component} from "@angular/core";

@Component({
    template: `
        <div class="navbar-item">
            <button class="button is-success" (click)="doSomething()">Only on home page</button>
        </div>
    `
})
export class HomeNavComponent {
    doSomething() {
        console.log('do something');
    }
}
