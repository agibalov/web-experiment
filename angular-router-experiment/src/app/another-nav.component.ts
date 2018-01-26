import {Component} from "@angular/core";

@Component({
    template: `
        <div class="navbar-item">
            <button class="button is-warning" (click)="doSomething()">Only on another page</button>
        </div>
    `
})
export class AnotherNavComponent {
    constructor() {
        console.log('omg!');
    }
    doSomething() {
        console.log('do something');
    }
}
