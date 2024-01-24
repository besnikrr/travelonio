import { createSelector } from '@ngrx/store';
import { AppState } from '../reducers';
import * as beds from '../reducers/beds.reducers';

export const bedsSelect = (state: AppState) =>
  state.beds;

export const bedsSelector = createSelector(
  bedsSelect,
  (state: beds.State) => state.beds
);
