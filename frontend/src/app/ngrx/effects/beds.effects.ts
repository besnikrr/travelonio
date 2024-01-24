import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { SnackBarService } from '../services/snackbar.service';
import { getBedsRequest, setBeds } from '../actions/beds.actions';
import { Bed, mapToBedData } from '../reducers/beds.reducers';
import { BedService } from '../services/beds.service';

@Injectable()
export class BedsEffects {
  getBedsRequest$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getBedsRequest),
        mergeMap((action) =>
          this.bedsService.getBeds().pipe(
            switchMap((beds: Bed[]) => {
              this.store.dispatch(
                setBeds({
                  beds: beds.map((b) => mapToBedData(b)),
                })
              );
              return of();
            }),
            catchError((e) => {
              this.snackBar.openSnackBar(e.error.failureType, 'Error');
              return EMPTY;
            })
          )
        )
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private bedsService: BedService,
    private store: Store,
    private router: Router,
    private snackBar: SnackBarService
  ) {}
}
