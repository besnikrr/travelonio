import { createAction, props } from '@ngrx/store';

const actionPrefix = '[Booking actions] ';
export const setAvailableRoomForBooking = createAction(
  actionPrefix + 'Set Available Room For Booking',
  props<{ data: any }>()
);

export const confirmBookingRequest = createAction(
  actionPrefix + 'Confirm Booking Request',
  props<{
    propertyId: string;
    roomId: string;
    startDate: string;
    endDate: string;
    guestsInfo: string;
    guests: { adults: number; children: number; infants: number };
    rooms: number;
    language: string;
  }>()
);

export const getBookedRoom = createAction(
  actionPrefix + 'Get Booked Room Request',
  props<{ propertyId: string; roomId: string; bookingId: string }>()
);

export const getBookedRoomSuccess = createAction(
  actionPrefix + 'Get Booked Room Request Success',
  props<{ data: any }>()
);
