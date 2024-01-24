import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Params,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { getPropertyListRequest } from '../ngrx/actions/properties.actions';
import {
  getCountriesAndCities,
  propertyFiltersChange,
} from '../ngrx/actions/settings.actions';
import { getLocationsList } from '../ngrx/selectors/settings.selectors';
import { filter, map } from 'rxjs/operators';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class PropertyListGuardService implements CanActivate {
  private urlParams: any;

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: string
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.store.dispatch(getCountriesAndCities({}));

      this.activatedRoute.queryParams.subscribe((params: Params) => {
        console.log('params: ', params);
        this.urlParams = {
          location:
            params['countryId'] || params['cityId'] || params['villageId']
              ? {
                  places: {
                    countryId: +params['countryId'],
                    cityId: +params['cityId'],
                    villageId: +params['villageId'] || '',
                  },
                }
              : '',
          startDate: params['startDate'] ? params['startDate'] : '',
          endDate: params['endDate'] ? params['endDate'] : '',
          adults: params['adults'] ? +params['adults'] : 0,
          children: params['children'] ? +params['children'] : 0,
          infants: params['infants'] ? +params['infants'] : 0,
          propertyType:
            typeof params['propertyType'] === 'string'
              ? [params['propertyType']]
              : params['propertyType'] || '',

          selectedSurroundings:
            typeof params['surroundings'] === 'string'
              ? [params['surroundings']]
              : params['surroundings'] || [],

          selectedTrips:
            typeof params['tripType'] === 'string'
              ? [params['tripType']]
              : params['tripType'] || [],

          minPrice: params['minPrice'],
          maxPrice: params['maxPrice'],
          sort: {
            price: params['price'] ? params['price'] : undefined,
            rating: params['rating'] ? +params['rating'] : undefined,
            bestValue: params['bestValue'] === 'true',
          },
        };
        setTimeout(() => {
          if (this.urlParams.location) {
            this.store.dispatch(
              propertyFiltersChange({
                places: this.removeEmptyKeysFromObject(
                  this.urlParams.location.places
                ),
              })
            );
          }
          if (
            this.urlParams.location &&
            this.urlParams.startDate &&
            this.urlParams.endDate &&
            (this.urlParams.adults ||
              this.urlParams.children ||
              this.urlParams.infants)
          ) {
            this.store.dispatch(
              getPropertyListRequest({
                request: this.removeEmptyKeysFromObject(this.urlParams),
              })
            );
          }
        });
      });
    }
  }

  public removeEmptyKeysFromObject(obj): any {
    for (const propName in obj) {
      if (obj[propName] === {} || obj[propName] === '') {
        delete obj[propName];
      }
    }
    return obj;
  }

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
    return this.store.pipe(
      select(getLocationsList),
      filter((events) => events.length > 0),
      map((events) => {
        return true;
      })
    );
  }
}
