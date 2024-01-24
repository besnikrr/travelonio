import { AppState } from '../reducers';
import { createSelector } from '@ngrx/store';
import * as booking from '../reducers/booking.reducers';

const bookingSelect = (state: AppState) => state.booking;

export const bookingSelector = createSelector(
  bookingSelect,
  (state: booking.State) => {
    return state.booking;
  }
);

export const reviewDataSelector = createSelector(
  bookingSelector,
  (data: any | undefined): any | undefined => {
    if (data) {
      return data;
    }

    return undefined;
  }
);
export const getReservedBookData = createSelector(
  bookingSelect,
  (state: booking.State) => {
    return state.bookedRoomData;
  }
);
