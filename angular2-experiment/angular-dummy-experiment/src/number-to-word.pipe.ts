import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToWord'
})
export class NumberToWordPipe implements PipeTransform {
  transform(value: number, uppercase: boolean = false): string {
    if(value === 0) {
      return uppercase ? 'ZERO' : 'zero';
    } else if(value === 1) {
      return uppercase ? 'ONE' : 'one';
    } else {
      return `${value}`;
    }
  }
}
