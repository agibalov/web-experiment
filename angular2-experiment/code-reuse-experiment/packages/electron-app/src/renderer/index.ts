import 'photon/dist/css/photon.css';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';

import {Component, Inject, NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {Calculator, SharedModule} from "shared";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
    selector: '#app',
    template: `
        <div class="window">
            <header class="toolbar toolbar-header" style="-webkit-app-region: drag;">
                <h1 class="title">Calculator</h1>
            </header>
            <div class="window-content">
                <div class="padded">
                    <form [formGroup]="calculatorForm" (ngSubmit)="addNumbers()">
                        <div class="form-group">
                            <label>Number A</label>
                            <input type="text" class="form-control" placeholder="Number A"
                                   formControlName="numberA">
                        </div>

                        <div class="form-group">
                            <label>Number B</label>
                            <input type="text" class="form-control" placeholder="Number B"
                                   formControlName="numberB">
                        </div>
                        
                        <div class="form-actions">
                            <button type="submit" class="btn btn-form btn-default">Add numbers</button>
                        </div>
                    </form>
                    <p>Result is {{result}}</p>
                    <p>(Ctrl+W to exit. At least on Ubuntu...)</p>
                </div>
            </div>
        </div>
    `
})
export class AppComponent {
    calculatorForm: FormGroup;
    result: number;

    constructor(
        @Inject(FormBuilder) private formBuilder: FormBuilder,
        @Inject(Calculator) private calculator: Calculator) {

        this.calculatorForm = formBuilder.group({
            numberA: ['', Validators.compose([])],
            numberB: ['', Validators.compose([])]
        });
    }

    addNumbers() {
        const value: {
            numberA: string,
            numberB: string
        } = this.calculatorForm.getRawValue();
        const numberA = parseInt(value.numberA);
        const numberB = parseInt(value.numberB);
        this.result = this.calculator.addNumbers(numberA, numberB);
    }
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        SharedModule
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.log(err));
