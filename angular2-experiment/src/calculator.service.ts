import { Injectable } from '@angular/core';

@Injectable()
export class CalculatorService {
	getPlusOne(x: number): number {
		console.log('CalculatorService::getPlusOne() called');
		return x + 1;
	}

	getMinusOne(x: number): number {
		console.log('CalculatorService::getMinusOne() called');
		return x - 1;
	}
}
