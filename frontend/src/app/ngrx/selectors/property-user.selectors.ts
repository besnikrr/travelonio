import { createSelector } from '@ngrx/store';
import { AppState } from '../reducers';
import * as propertyUserSession from '../reducers/property-user.reducers';

const propertyUserSessionSelect = (state: AppState) =>
  state.propertyUserSession;

export const propertyUserSessionSelector = createSelector(
  propertyUserSessionSelect,
  (state: propertyUserSession.State) => state.userSession
);

export const isSignUpStepsCompleted = createSelector(
  propertyUserSessionSelect,
  (state: propertyUserSession.State) => state.signUpStepsCompleted
);

export const isShowLoadingIndicator = createSelector(
  propertyUserSessionSelect,
  (state: propertyUserSession.State) => state.showLoadingIndicator
);

export const isBecomeAHostButtonClicked = createSelector(
  propertyUserSessionSelect,
  (state: propertyUserSession.State) => state.isBecomeAHostButtonClicked
);

