import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { getPropertyRequest } from '../ngrx/actions/properties.actions';
import { getRoomsRequest } from '../ngrx/actions/rooms.actions';
import { isPlatformServer } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class PropertyGuardService implements CanActivate {
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
    this.store.dispatch(
      getPropertyRequest({ propertyId: route.params.propertyId })
    );
    this.store.dispatch(
      getRoomsRequest({ propertyId: route.params.propertyId })
    );

    return true;
  }
}
