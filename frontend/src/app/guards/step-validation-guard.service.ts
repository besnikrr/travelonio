import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { combineLatest, Observable, of } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { propertySelector } from '../ngrx/selectors/properties.selectors';
import { roomsSelector } from '../ngrx/selectors/rooms.selectors';
import { filter, mergeMap } from 'rxjs/operators';
import { areInputsFine } from '../shared/form-validator';
import { getCurrentRouteState } from '../ngrx/reducers';
import { markPropertyInputsDirty } from '../ngrx/actions/properties.actions';
import { isPlatformServer } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class StepValidationGuardService implements CanActivate {
  constructor(
    private store: Store,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: string
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (isPlatformServer(this.platformId)) {
      return true;
    }
    return combineLatest([
      this.store.pipe(select(propertySelector)),
      this.store.pipe(select(roomsSelector)),
      this.store.pipe(select(getCurrentRouteState)),
    ]).pipe(
      filter(
        (r) => r[0] !== undefined && r[1] !== undefined && r[2] !== undefined
      ),
      mergeMap(([property, rooms, currentRouteState]) => {
        // @ts-ignore
        const stepId = +currentRouteState.state.params.stepId;
        if (stepId === 1) {
          return of(true);
        } else {
          let ok = true;
          let nextStepToGO = stepId;
          for (let i = 1; i < stepId; i++) {
            ok = areInputsFine(property, rooms, i);
            if (ok === false) {
              nextStepToGO = i;
              break;
            }
          }

          if (nextStepToGO === stepId) {
            this.store.dispatch(markPropertyInputsDirty({ setTo: false }));
            return of(true);
          } else {
            this.router.navigate([
              '/sign-up/property/' +
                property.propertyId +
                '/steps/' +
                nextStepToGO,
            ]);
            this.store.dispatch(markPropertyInputsDirty({ setTo: true }));
          }
        }
      })
    );
  }
}
