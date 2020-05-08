import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { jump, set } from './counter.actions';
import { delay, mergeMap } from 'rxjs/operators';
import { merge, of } from 'rxjs';
import { RandomService } from './random.service';

@Injectable()
export class CounterEffects {
  jumpCounter$ = createEffect(() => this.actions$.pipe(
    ofType(jump),
    mergeMap(() => {
      return merge(
        of(set({ value: this.randomService.getRandom() })),
        of(set({ value: this.randomService.getRandom() })).pipe(delay(500)),
        of(set({ value: this.randomService.getRandom() })).pipe(delay(1000))
      );
    })
  ));

  constructor(
    private readonly actions$: Actions,
    private readonly randomService: RandomService) {
  }
}
