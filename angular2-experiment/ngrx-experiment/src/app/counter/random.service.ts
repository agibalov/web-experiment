import { Injectable } from '@angular/core';

@Injectable()
export class RandomService {
  getRandom(): number {
    return Math.random();
  }
}
