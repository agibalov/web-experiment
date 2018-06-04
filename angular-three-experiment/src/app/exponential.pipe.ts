import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'exponential' })
export class ExponentialPipe implements PipeTransform {
  transform(value: number): string {
    if (value === null) {
      return null;
    }

    return value.toExponential(1);
  }
}
