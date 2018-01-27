import {Component} from '@angular/core';
import {AuthService} from "ng2-ui-auth";

@Component({
    selector: 'app-root',
    template: `
        <div class="container">
            <pre>result: {{result|json}}</pre>
            
            <button type="button" 
                    class="button is-primary" (click)="signInWithGoogle()">Google</button>
        </div>
    `,
    styles: []
})
export class AppComponent {
    result: any;

    constructor(private authService: AuthService) {
    }

    signInWithGoogle() {
        this.authService.authenticate('google').subscribe({
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
