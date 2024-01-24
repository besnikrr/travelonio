import * as propertyUser from './property-user.reducers';
import * as properties from './properties.reducers';
import * as rooms from './rooms.reducers';
import * as beds from './beds.reducers';
import * as settings from './settings.reducers';
import * as booking from './booking.reducers';

import { ActionReducerMap, createSelector } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { routerReducer } from '@ngrx/router-store';

export interface AppState {
  propertyUserSession: propertyUser.State;
  properties: properties.State;
  rooms: rooms.State;
  beds: beds.State;
  router: StoreRootState;
  settings: settings.State;
  booking: booking.State;
}

export const initialState = {
  propertyUserSession: propertyUser.initialState,
  properties: properties.initialState,
  rooms: rooms.initialState,
  beds: beds.initialState,
  router: routerReducer,
  settings: settings.initialState,
  booking: booking.initialState,
};

export const rootReducer = {
  propertyUserSession: propertyUser.reducer,
  properties: properties.reducer,
  rooms: rooms.reducer,
  beds: beds.reducer,
  router: routerReducer,
  settings: settings.reducer,
  booking: booking.reducer,
};

// Router store start
export interface StoreRootState {
  router: fromRouter.RouterReducerState<any>;
}

export const reducers: ActionReducerMap<StoreRootState> = {
  router: routerReducer,
};
export const getRouterState = (state: AppState) => state.router;
export const getCurrentRouteState = createSelector(
  getRouterState,
  (state) => state
);
// Router store end
