import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
    message: string = '...loading...';

    ngOnInit(): void {
        of('hello world').pipe(delay(1000)).subscribe(x => {
            this.message = x;
        });
    }
}
