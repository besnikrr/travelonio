import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  confirmBookingRequest,
  setAvailableRoomForBooking,
} from '../actions/booking.actions';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { BookingService } from '../services/booking.service';
import { Router } from '@angular/router';

@Injectable()
export class BookingEffects {
  setAvailableRoomForBooking$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(setAvailableRoomForBooking),
        mergeMap((action) => {
          return of();
        })
      ),
    { dispatch: false }
  );
  confirmBookingRequest$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(confirmBookingRequest),
        mergeMap((action) => {
          return this.bookingService
            .reserveRoom(
              action.propertyId,
              action.roomId,
              action.startDate,
              action.endDate,
              action.guestsInfo,
              action.guests,
              action.rooms,
              action.language
            )
            .pipe(
              switchMap((data) => {
                localStorage.removeItem('guests');
                this.router.navigate(
                  [
                    'properties/' +
                      action.propertyId +
                      '/rooms/' +
                      action.roomId +
                      '/booking/' +
                      data.id,
                  ],
                  { queryParamsHandling: 'merge' }
                );

                return of();
              }),
              catchError((e) => {
                return e;
              })
            );

          return of();
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private bookingService: BookingService,
    private router: Router
  ) {}
}
