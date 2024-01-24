import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { PropertyUsersService } from '../services/property-user-service';
import {
  changePasswordRequest,
  checkPropertyUserSessionRequest,
  loginPropertyUserRequest,
  loginPropertyUserSuccess,
  logoutPropertyUserRequest,
  logoutPropertyUserSuccess,
  registerPropertyUserRequest,
  sendRecoveryLinkRequest,
  setIsBecomeAHostButtonClicked,
  setPropertyUserSession,
  setShowLoadingIndicator,
  updateUserSelfRequest,
} from '../actions/property-user.actions';
import {
  LoginPropertyUser,
  PropertyUser,
  PropertyUserSession,
  UserData,
} from '../actions/action-models';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { SnackBarService } from '../services/snackbar.service';
import { isPlatformBrowser } from '@angular/common';
import { setOpenWelcomeModal } from '../actions/settings.actions';
import { isBecomeAHostButtonClicked } from '../selectors/property-user.selectors';

@Injectable()
export class PropertyUserEffects {
  registerPropertyUserRequest$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(registerPropertyUserRequest),
        mergeMap((action) =>
          this.propertyUsersService
            .registerPropertyUser(action.registerPropertyUser)
            .pipe(
              switchMap((propertyUser: PropertyUser) => {
                if (propertyUser) {
                  this.store.dispatch(
                    setOpenWelcomeModal({
                      openModal: true,
                      loginPropertyUser: {
                        email: propertyUser.email,
                        password: action.registerPropertyUser.password,
                      },
                    })
                  );
                }

                this.store.dispatch(
                  loginPropertyUserRequest({
                    loginPropertyUser: {
                      email: action.registerPropertyUser.email,
                      password: action.registerPropertyUser.password,
                    } as LoginPropertyUser,
                  })
                );

                return of();
              }),
              catchError((e) => {
                this.store.dispatch(
                  setShowLoadingIndicator({
                    show: false,
                  })
                );
                this.snackBar.openSnackBar(e.error.failureType, 'Error');
                return EMPTY;
              })
            )
        )
      ),
    { dispatch: false }
  );

  loginPropertyUserRequest$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginPropertyUserRequest),
        mergeMap((action) =>
          this.propertyUsersService
            .loginPropertyUser(action.loginPropertyUser)
            .pipe(
              map((propertyUserSession: PropertyUserSession) => {
                this.store.dispatch(
                  loginPropertyUserSuccess({
                    propertyUserSession,
                    preventNavigateAfterLogin:
                      action.preventNavigationAfterLogin,
                  })
                );
                if (isPlatformBrowser(this.platformId)) {
                  window.localStorage.setItem(
                    'jwt',
                    propertyUserSession.sessionToken
                  );
                }
                return of();
              }),
              catchError((e) => {
                this.store.dispatch(
                  setShowLoadingIndicator({
                    show: false,
                  })
                );
                this.snackBar.openSnackBar(e.error.failureType, 'Error');
                return EMPTY;
              })
            )
        )
      ),
    { dispatch: false }
  );

  logoutPropertyUserRequest$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logoutPropertyUserRequest),
        mergeMap(() =>
          this.propertyUsersService.logoutPropertyUser().pipe(
            map(() => {
              this.store.dispatch(logoutPropertyUserSuccess());
              if (isPlatformBrowser(this.platformId)) {
                window.localStorage.removeItem('jwt');
              }
              return of();
            }),
            catchError(() => EMPTY)
          )
        )
      ),
    { dispatch: false }
  );

  logoutPropertyUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logoutPropertyUserSuccess),
        mergeMap(() => this.router.navigate(['login']))
      ),
    { dispatch: false }
  );

  checkPropertyUserSession$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(checkPropertyUserSessionRequest),
        mergeMap((action) =>
          this.propertyUsersService.checkPropertyUserSession().pipe(
            map((propertyUserSession: PropertyUserSession) => {
              this.store.dispatch(
                setPropertyUserSession({
                  propertyUserSession,
                })
              );
            }),
            catchError(() => {
              if (isPlatformBrowser(this.platformId)) {
                window.localStorage.removeItem('jwt');
              }
              return of(
                setPropertyUserSession({ propertyUserSession: undefined })
              );
            })
          )
        )
      ),
    { dispatch: false }
  );

  loginPropertyUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginPropertyUserSuccess),
        withLatestFrom(this.store.select(isBecomeAHostButtonClicked)),
        mergeMap(([action, isClicked]) => {
          const redirectUrl = localStorage.getItem('redirectTo');
          if (redirectUrl !== null) {
            window.location.href = redirectUrl;
            localStorage.removeItem('redirectTo');
          } else {
            if (!action.preventNavigateAfterLogin) {
              if (isClicked) {
                this.router.navigate(['/sign-up']);
                this.store.dispatch(
                  setIsBecomeAHostButtonClicked({ isClicked: false })
                );
              } else {
                this.router.navigate(['']);
              }
            }
          }
          this.store.dispatch(
            setShowLoadingIndicator({
              show: false,
            })
          );

          return of();
        })
      ),
    { dispatch: false }
  );

  sendRecoveryLinkRequest$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(sendRecoveryLinkRequest),
        mergeMap((action) =>
          this.propertyUsersService.sendRecoveryLink(action.email).pipe(
            map((response: string) => {
              this.store.dispatch(
                setShowLoadingIndicator({
                  show: false,
                })
              );
              this.snackBar.openSnackBar(
                'Recovery link sent to your email',
                'Success'
              );
              return of();
            }),
            catchError((e) => {
              this.store.dispatch(
                setShowLoadingIndicator({
                  show: false,
                })
              );
              this.snackBar.openSnackBar(
                'Recovery link could not be sent',
                'Error'
              );
              return EMPTY;
            })
          )
        )
      ),
    { dispatch: false }
  );
  changePasswordRequest$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(changePasswordRequest),
        mergeMap((action) =>
          this.propertyUsersService
            .changePassword(action.userId, action.newPassword, action.token)
            .pipe(
              map((session: PropertyUserSession) => {
                this.store.dispatch(
                  loginPropertyUserSuccess({ propertyUserSession: session })
                );
                if (isPlatformBrowser(this.platformId)) {
                  window.localStorage.setItem('jwt', session.sessionToken);
                }
                this.snackBar.openSnackBar('Password changed', 'Success');
                return of();
              }),
              catchError((e) => {
                this.store.dispatch(
                  setShowLoadingIndicator({
                    show: false,
                  })
                );
                this.snackBar.openSnackBar(
                  'Could not change you password',
                  'Error'
                );
                return EMPTY;
              })
            )
        )
      ),
    { dispatch: false }
  );

  updaterUserSelf$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateUserSelfRequest),
        mergeMap((action) =>
          this.propertyUsersService.updateSelf(action.language).pipe(
            map((user: UserData) => {}),
            catchError(() => {
              return of();
            })
          )
        )
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private propertyUsersService: PropertyUsersService,
    private store: Store,
    private router: Router,
    private snackBar: SnackBarService,
    @Inject(PLATFORM_ID) private platformId: string
  ) {}
}
