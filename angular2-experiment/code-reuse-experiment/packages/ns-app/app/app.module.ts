import {NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import {NativeScriptModule} from "nativescript-angular/nativescript.module";

import {AppComponent} from "./app.component";
import {SharedModule} from "shared";

@NgModule({
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    imports: [NativeScriptModule, SharedModule],
    schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {
}