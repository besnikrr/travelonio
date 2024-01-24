import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { checkPropertyUserSessionRequest, setPropertyUserSession } from '../ngrx/actions/property-user.actions';
import { isPlatformServer } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private store: Store,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: string
  ) {
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
    if (window.localStorage.getItem('jwt') === null) {
      this.router.navigate(['/login']);
      this.store.dispatch(setPropertyUserSession(undefined));
      return false;
    } else {
      this.store.dispatch(checkPropertyUserSessionRequest({ check: true }));
      return true;
    }
  }
}
