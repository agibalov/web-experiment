import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CounterModule } from './counter/counter.module';
import { ActionReducer, StoreModule } from '@ngrx/store';
import { TodosModule } from './todos/todos.module';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { routerFeatureKey } from './router.reducer';

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    console.log('Log', state, action);
    return reducer(state, action);
  };
}

export const reducers = {
  router/*[routerFeatureKey]*/: routerReducer
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionWithinNgZone: true
      },
      metaReducers: [debug]
    }),
    AppRoutingModule,
    EffectsModule.forRoot(),
    StoreRouterConnectingModule.forRoot(),
    CounterModule,
    TodosModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
