import {Component} from '@angular/core';
import {Calculator} from "shared";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-root',
    template: `
        <div class="container">
            <form [formGroup]="calculatorForm" (ngSubmit)="addNumbers()">
                <div class="field is-horizontal">
                    <div class="field-label is-normal">
                        <label class="label">Number A</label>
                    </div>
                    <div class="field-body">
                        <div class="field">
                            <div class="control">
                                <input type="text" class="input" placeholder="Number A"
                                       formControlName="numberA">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="field is-horizontal">
                    <div class="field-label is-normal">
                        <label class="label">Number B</label>
                    </div>
                    <div class="field-body">
                        <div class="field">
                            <div class="control">
                                <input type="text" class="input" placeholder="Number B"
                                       formControlName="numberB">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="field is-horizontal">
                    <div class="field-label"></div>
                    <div class="field-body">
                        <div class="field">
                            <div class="control">
                                <button type="submit" class="button is-primary">Add numbers</button>
                            </div>
                            <span>Result is {{result}}</span>
                        </div>
                    </div>
                </div>
            </form>
    
            
        </div>
    `
})
export class AppComponent {
    calculatorForm: FormGroup;
    result: number;

    constructor(
        private formBuilder: FormBuilder,
        private calculator: Calculator) {

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
