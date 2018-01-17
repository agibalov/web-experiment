import {Component} from "@angular/core";
import {Page} from "tns-core-modules/ui/page";
import {TextField} from "tns-core-modules/ui/text-field";
import {Calculator} from "shared";

@Component({
    selector: "my-app",
    template: `
        <ActionBar title="Calculator" class="action-bar"></ActionBar>
        <StackLayout orientation="vertical">
            <TextField id="numberATextField" hint="Number A" padding="10"></TextField>
            <TextField id="numberBTextField" hint="Number B" padding="10"></TextField>
            <Button text="Add Numbers" (tap)="addNumbers()"></Button>
        </StackLayout>
    `
})
export class AppComponent {
    constructor(
        private page: Page,
        private calculator: Calculator) {
    }

    addNumbers() {
        const numberATextField = <TextField>this.page.getViewById('numberATextField');
        const numberBTextField = <TextField>this.page.getViewById('numberBTextField');

        const numberA = parseInt(numberATextField.text, 10);
        const numberB = parseInt(numberBTextField.text, 10);
        const result = this.calculator.addNumbers(numberA, numberB);

        const message = `${numberA} + ${numberB} = ${result}`;
        console.log(message);
        alert(message);
    }
}
