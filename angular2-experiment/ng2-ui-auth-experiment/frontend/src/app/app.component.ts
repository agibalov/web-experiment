import {Component} from '@angular/core';
import {AuthService} from "ng2-ui-auth";

@Component({
    selector: 'app-root',
    template: `
        <div class="container">
            <pre>result: {{result|json}}</pre>
            
            <button type="button" class="button is-primary" (click)="signIn('google')">Google</button>
            <button type="button" class="button is-primary" (click)="signIn('facebook')">Facebook</button>
        </div>
    `,
    styles: []
})
export class AppComponent {
    result: any;

    constructor(private authService: AuthService) {
    }

    signIn(provider: 'google'|'facebook') {
        this.authService.authenticate(provider).subscribe({
            next: (result: any) => {
                console.log('Result', result);
                this.result = result;
            },
            error: (err: any) => {
                console.log('Error!', err);
                this.result = err;
            }
        });
    }
}
