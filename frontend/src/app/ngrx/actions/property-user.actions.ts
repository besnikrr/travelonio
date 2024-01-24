import { createAction, props } from '@ngrx/store';
import {
  LoginPropertyUser,
  PropertyUserSession,
  RegisterPropertyUser,
} from './action-models';

const actionPrefix = '[Register Property User Page] ';

// register
export const registerPropertyUserRequest = createAction(
  actionPrefix + 'Register Property User Request',
  props<{ registerPropertyUser: RegisterPropertyUser }>()
);

export const registerPropertyUserSuccess = createAction(
  actionPrefix + 'Register Property User Success'
);

// login
export const loginPropertyUserRequest = createAction(
  actionPrefix + 'Login Property User Request',
  props<{
    loginPropertyUser: LoginPropertyUser;
    preventNavigationAfterLogin?: boolean;
  }>()
);

export const loginPropertyUserSuccess = createAction(
  actionPrefix + 'Login Property User Success',
  props<{
    propertyUserSession: PropertyUserSession;
    preventNavigateAfterLogin?: boolean;
  }>()
);

// logout
export const logoutPropertyUserRequest = createAction(
  actionPrefix + 'Logout Property User Request'
);
export const logoutPropertyUserSuccess = createAction(
  actionPrefix + 'Logout Property User Success'
);

// session checker
export const checkPropertyUserSessionRequest = createAction(
  actionPrefix + 'Check Property User Session Request',
  props<{ check: boolean }>()
);

export const setPropertyUserSession = createAction(
  actionPrefix + 'Check Property User Session Success',
  props<{ propertyUserSession: PropertyUserSession | undefined }>()
);

// forgot password
export const sendRecoveryLinkRequest = createAction(
  actionPrefix + 'Send Property User Recovery Link Request',
  props<{ email: string }>()
);

// change password
export const changePasswordRequest = createAction(
  actionPrefix + 'Change Password Request',
  props<{ userId: string; newPassword: string; token: string }>()
);

// stepper action
export const changeStepperValue = createAction(
  actionPrefix + 'Change stepper value',
  props<{ newValue: number }>()
);

// sign up  steps completed
export const signUpStepsCompleted = createAction(
  actionPrefix + 'Sign up steps completed',
  props<{ completed: boolean }>()
);

// sign up  steps completed
export const showTermsAndConditionsErrorInSignUp = createAction(
  actionPrefix + 'Show terms and conditions error in sign up',
  props<{ show: boolean }>()
);

// show loading indicator
export const setShowLoadingIndicator = createAction(
  actionPrefix + 'Set show loading idicator',
  props<{ show: boolean }>()
);

// set a variable in state that the user has clicked the become a host button
export const setIsBecomeAHostButtonClicked = createAction(
  actionPrefix + 'Set is become a host button clicked',
  props<{ isClicked: boolean }>()
);

// set a variable in state that the user has clicked the become a host button
export const updateUserSelfRequest = createAction(
  actionPrefix + 'update User Self Request',
  props<{ language: string }>()
);
