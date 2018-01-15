import {Injectable, NgModule} from "@angular/core";

@Injectable()
export class Calculator {
    addNumbers(a: number, b: number): number {
        return a + b;
    }
}

@NgModule({
    providers: [
        Calculator
    ]
})
export class SharedModule {
}
