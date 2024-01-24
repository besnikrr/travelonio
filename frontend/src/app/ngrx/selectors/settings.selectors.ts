import {AppState} from '../reducers';
import {createSelector} from '@ngrx/store';
import * as settings from '../reducers/settings.reducers';

export const settingsSelector = (state: AppState) =>
  state.settings;

export const openWelcomeModal = createSelector(
  settingsSelector,
  (state: settings.State) => state.openWelcomeModal
);

export const getLocationsList = createSelector(
  settingsSelector,
  (state: settings.State) => state.locations
);

export const getHomePageSelectedPlaceIds = createSelector(
  settingsSelector,
  (state: settings.State) => state.homePageSelectedPlaceIds
);

export const getPropertyFiltersLocation = createSelector(
  settingsSelector,
  (state: settings.State) => state.propertyFilters.location
);
