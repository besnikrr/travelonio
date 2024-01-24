import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BookingService } from '../ngrx/services/booking.service';
import { getCurrentRouteState } from '../ngrx/reducers';
import { flatMap, map } from 'rxjs/operators';
import { CheckRoomAvailabilityBody } from '../ngrx/reducers/booking.reducers';
import { setAvailableRoomForBooking } from '../ngrx/actions/booking.actions';
import { isPlatformServer } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class BookingGuardService implements CanActivate {
  constructor(
    private store: Store,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: string,
    private bookingService: BookingService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (isPlatformServer(this.platformId)) {
      return true;
    }

    return this.store.select(getCurrentRouteState).pipe(
      flatMap((router) => {
        // @ts-ignore
        const state = router.state;
        const body = {
          roomIds: [state.params.roomId],
          startDate: state.queryParams.startDate,
          endDate: state.queryParams.endDate,
          adults: isNaN(+state.queryParams.adults)
            ? 0
            : +state.queryParams.adults,
          children: isNaN(+state.queryParams.children)
            ? 0
            : +state.queryParams.children,
          infants: isNaN(+state.queryParams.infants)
            ? 0
            : +state.queryParams.infants,
          rooms: isNaN(+state.queryParams.rooms) ? 0 : +state.queryParams.rooms,
        } as CheckRoomAvailabilityBody;

        return this.bookingService
          .checkRoomAvailability(state.params.propertyId, body)
          .pipe(
            map((res) => {
              if (res.rooms && res.rooms.length > 0) {
                this.store.dispatch(setAvailableRoomForBooking({ data: res }));
                return true;
              } else {
                this.router.navigate(['home']);
              }
            })
          );
      })
    );
  }
}
