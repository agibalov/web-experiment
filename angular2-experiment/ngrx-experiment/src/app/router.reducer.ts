import { getSelectors, RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector } from '@ngrx/store';

export const routerFeatureKey = 'routerFeature';

export const selectRouter = createFeatureSelector<RouterReducerState<any>>(routerFeatureKey);

export const { selectRouteParam } = getSelectors(selectRouter);
