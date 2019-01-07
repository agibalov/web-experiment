import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-root',
    template: `
        <div class="container">
            <button type="button" class="button is-success" (click)="handleClick()">Click me</button>
            <pre>{{result|json}}</pre>
        </div>
    `,
    styles: []
})
export class AppComponent {
    result: any = null;

    constructor(private httpClient: HttpClient) {}

    handleClick() {
        this.result = null;
        this.httpClient.get(`/api/test`).subscribe(value => {
            this.result = value;
        });
    }
}
