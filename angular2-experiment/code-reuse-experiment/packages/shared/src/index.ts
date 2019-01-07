import {Injectable, NgModule} from "@angular/core";

@Injectable()
export class Calculator {
    addNumbers(a: number, b: number): number {
        console.log(`I am the Calculator service from 'shared' package and someone wants me to add ${a} and ${b}`);
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
