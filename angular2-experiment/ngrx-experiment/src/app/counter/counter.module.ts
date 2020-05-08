import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterPageComponent } from './counter-page/counter-page.component';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { counterFeatureKey, counterReducer } from './counter.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CounterEffects } from './counter.effects';
import { RandomService } from './random.service';

const routes: Routes = [
  {
    path: 'counter',
    component: CounterPageComponent
  }
];

@NgModule({
  declarations: [
    CounterPageComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    StoreModule.forFeature(counterFeatureKey, counterReducer),
    EffectsModule.forFeature([CounterEffects])
  ],
  providers: [
    RandomService
  ]
})
export class CounterModule {
}
