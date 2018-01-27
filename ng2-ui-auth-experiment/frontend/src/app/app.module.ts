import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {Ng2UiAuthModule} from "ng2-ui-auth";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        Ng2UiAuthModule.forRoot({
            providers: {
                google: {
                    clientId: '293281611213-o3e5d2df4nh6s2dke25gck5n5em2mma5.apps.googleusercontent.com'
                }
            }
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
