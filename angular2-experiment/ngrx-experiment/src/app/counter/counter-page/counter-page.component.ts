import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { increment, decrement, reset, set, jump } from '../counter.actions';
import { selectCount } from '../counter.reducer';
import { State } from '../../reducers';

@Component({
  selector: 'app-counter-page',
  templateUrl: './counter-page.component.html',
  styleUrls: ['./counter-page.component.scss']
})
export class CounterPageComponent {
  readonly count$: Observable<number> = this.store.pipe(select(selectCount));

  constructor(private readonly store: Store<State>) {
  }

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }

  set(value: number) {
    this.store.dispatch(set({ value }));
  }

  jump() {
    this.store.dispatch(jump());
  }
}
