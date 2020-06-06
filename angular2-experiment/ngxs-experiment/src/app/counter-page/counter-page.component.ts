import { Component, Injectable, OnInit } from '@angular/core';
import { Action, State, StateContext, Store } from '@ngxs/store';

export class Increment {
  static readonly type = '[Counter] Increment';
  constructor(public by: number) {}
}

export class Decrement {
  static readonly type = '[Counter] Decrement';
  constructor(public by: number) {}
}

export class Throw {
  static readonly type = '[Counter] Throw';
  constructor(public message: string) {}
}

export interface CounterStateModel {
  count: number;
  working: boolean;
}

@State<CounterStateModel>({
  name: 'counter',
  defaults: {
    working: false,
    count: 0
  }
})
@Injectable()
export class CounterState {
  constructor(private readonly calculatorService: CalculatorService) {
  }

  @Action(Increment)
  async increment(ctx: StateContext<CounterStateModel>, action: Increment) {
    await this.withWorkInProgress(ctx, async () => {
      const state = ctx.getState();
      const newCount = await this.calculatorService.addNumbers(state.count, action.by);
      ctx.setState({
        ...state,
        count: newCount
      });
    });
  }

  @Action(Decrement)
  async decrement(ctx: StateContext<CounterStateModel>, action: Decrement) {
    await this.withWorkInProgress(ctx, async () => {
      const state = ctx.getState();
      const newCount = await this.calculatorService.subNumbers(state.count, action.by);
      ctx.setState({
        ...state,
        count: newCount
      });
    });
  }

  @Action(Throw)
  async throw(ctx: StateContext<CounterStateModel>, action: Throw) {
    throw new Error(action.message);
  }

  private async withWorkInProgress(ctx: StateContext<CounterStateModel>, callable: () => Promise<void>) {
    ctx.patchState({ working: true });
    try {
      await callable();
    } finally {
      ctx.patchState({ working: false });
    }
  }
}

@Injectable()
export class CalculatorService {
  async addNumbers(a: number, b: number): Promise<number> {
    await this.sleep(300);
    return a + b;
  }

  async subNumbers(a: number, b: number): Promise<number> {
    await this.sleep(300);
    return a - b;
  }

  private async sleep(time) {
    await new Promise(resolve => setTimeout(resolve, time));
  }
}

@Component({
  selector: 'app-counter-page',
  templateUrl: './counter-page.component.html',
  styleUrls: ['./counter-page.component.scss']
})
export class CounterPageComponent {
  counterState$ = this.store.select(state => state.counter);
  snapshot: CounterStateModel;

  constructor(private readonly store: Store) {
  }

  async increment() {
    console.log('Just before increment');
    await this.store.dispatch(new Increment(1)).toPromise();
    console.log('Right after increment');
  }

  async decrement() {
    console.log('Just before decrement');
    await this.store.dispatch(new Decrement(1)).toPromise();
    console.log('Just after decrement');
  }

  async throw() {
    console.log('Just before throw');
    await this.store.dispatch(new Throw('Some awful error')).toPromise();
    console.log('Just after throw');
  }

  makeSnapshot() {
    this.snapshot = this.store.selectSnapshot(state => state.counter);
  }
}
