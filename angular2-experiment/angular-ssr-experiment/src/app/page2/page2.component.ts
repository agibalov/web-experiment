import { Component, Inject, OnInit, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Request } from 'express';

@Component({
    selector: 'app-page2',
    templateUrl: './page2.component.html',
    styleUrls: ['./page2.component.scss']
})
export class Page2Component implements OnInit {
    response: any = '...loading...';

    constructor(
        @Optional() @Inject(REQUEST) protected request: Request,
        private readonly httpClient: HttpClient) {
    }

    ngOnInit(): void {
        let url = '/api/message';
        if (this.request) {
            url = `${this.request.protocol}://${this.request.get('host')}` + url;
        }
        console.log(`URL: ${url}`);

        this.httpClient.get(url, {
            observe: 'response'
        }).subscribe(response => {
            this.response = response;
        }, error => {
            this.response = error;
        });
    }
}
