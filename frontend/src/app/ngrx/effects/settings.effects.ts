import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { SnackBarService } from '../services/snackbar.service';
import { BedService } from '../services/beds.service';
import {
  getCountriesAndCities,
  getCountriesAndCitiesSuccess,
  propertyFiltersChange,
  setPropertyFilters,
} from '../actions/settings.actions';

import { SettingsServices } from '../services/settings.services';
import {
  mapToMunicipalityInfo,
  MunicipalityInfo,
} from '../../atomic-design/pages/sign-up/model/locations';
import { getLocationsList } from '../selectors/settings.selectors';

@Injectable()
export class SettingsEffects {
  getLocations$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getCountriesAndCities),
        mergeMap((action) =>
          this.settingsService.getLocations(action.queryParam).pipe(
            switchMap((locations: MunicipalityInfo[]) => {
              this.store.dispatch(
                getCountriesAndCitiesSuccess({
                  locations: locations.map((l) => mapToMunicipalityInfo(l)),
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

  propertyFiltersChange$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(propertyFiltersChange),
        withLatestFrom(this.store.select(getLocationsList)),
        mergeMap(([action, locations]) => {
          const selectedLocation = action.places.villageId
            ? locations.find(
                (location) =>
                  location.countryId === action.places.countryId &&
                  location.cityId === action.places.cityId &&
                  location.villageId === action.places.villageId
              )
            : locations.find(
                (location) =>
                  location.countryId === action.places.countryId &&
                  location.cityId === action.places.cityId &&
                  location.villageId === null
              );
          return of(setPropertyFilters({ location: selectedLocation }));
        })
      ),
    { dispatch: true }
  );

  constructor(
    private actions$: Actions,
    private bedsService: BedService,
    private store: Store,
    private router: Router,
    private snackBar: SnackBarService,
    private settingsService: SettingsServices
  ) {}
}
