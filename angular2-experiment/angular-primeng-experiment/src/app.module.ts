import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ButtonModule, DataTableModule, SharedModule, TabViewModule, GrowlModule } from 'primeng/primeng'

@NgModule({
    imports: [ BrowserModule, ButtonModule, DataTableModule, SharedModule, TabViewModule, GrowlModule ],
    declarations: [
        AppComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
