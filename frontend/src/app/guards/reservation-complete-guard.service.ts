import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { BookingService } from '../ngrx/services/booking.service';
import { catchError, map } from 'rxjs/operators';
import { getBookedRoomSuccess } from '../ngrx/actions/booking.actions';
import { isPlatformServer } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ReservationCompleteGuardService implements CanActivate {
  constructor(
    private store: Store,
    private router: Router,
    private bookingService: BookingService,
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
    return this.bookingService
      .getReservedRoom(
        route.params.propertyId,
        route.params.roomId,
        route.params.bookingId
      )
      .pipe(
        map((data) => {
          this.store.dispatch(getBookedRoomSuccess({ data }));

          return true;
        }),
        catchError((e) => {
          this.router.navigate([
            'booking/property/' +
              route.params.propertyId +
              '/rooms/' +
              route.params.roomId +
              '/payment',
          ]);

          return of(false);
        })
      );
  }
}
