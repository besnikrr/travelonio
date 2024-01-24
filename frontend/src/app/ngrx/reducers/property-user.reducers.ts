import { Action, createReducer, on } from '@ngrx/store';
import {
  changeStepperValue,
  loginPropertyUserSuccess,
  logoutPropertyUserSuccess,
  setIsBecomeAHostButtonClicked,
  setPropertyUserSession,
  setShowLoadingIndicator,
  showTermsAndConditionsErrorInSignUp,
  signUpStepsCompleted,
} from '../actions/property-user.actions';
import { PropertyUserSession } from '../actions/action-models';

export interface State {
  userSession: PropertyUserSession | undefined;
  stepperValue: number;
  signUpStepsCompleted: boolean;
  showTermsAndConditionsErrorInSignUp: boolean;
  showLoadingIndicator: boolean;
  isBecomeAHostButtonClicked: boolean;
}

export const initialState: State = {
  userSession: undefined,
  stepperValue: 0,
  signUpStepsCompleted: false,
  showTermsAndConditionsErrorInSignUp: false,
  showLoadingIndicator: false,
  isBecomeAHostButtonClicked: false,
};

export const reducer = createReducer<State, Action>(
  initialState,
  on(loginPropertyUserSuccess, (state, { propertyUserSession }) => ({
    ...state,
    userSession: propertyUserSession,
  })),
  on(logoutPropertyUserSuccess, (state) => ({
    ...state,
    userSession: undefined,
  })),
  on(changeStepperValue, (state, { newValue }) => ({
    ...state,
    stepperValue: newValue,
  })),
  on(signUpStepsCompleted, (state, { completed }) => ({
    ...state,
    signUpStepsCompleted: completed,
  })),
  on(showTermsAndConditionsErrorInSignUp, (state, { show }) => ({
    ...state,
    showTermsAndConditionsErrorInSignUp: show,
  })),
  on(setPropertyUserSession, (state, { propertyUserSession }) => {
    return { ...state, userSession: propertyUserSession };
  }),
  on(setShowLoadingIndicator, (state, { show }) => {
    return { ...state, showLoadingIndicator: show };
  }),
  on(setIsBecomeAHostButtonClicked, (state, { isClicked }) => {
    return { ...state, isBecomeAHostButtonClicked: isClicked };
  })
);
