import { Action, createReducer, on } from '@ngrx/store';
import { setAvailableRoomForBooking } from '../actions/booking.actions';
import {getBookedRoomSuccess} from "../actions/booking.actions";

export interface CheckRoomAvailabilityBody {
  roomIds: string[];
  startDate: string;
  endDate: string;
  adults: number;
  children: number;
  infants: number;
}

export interface State {
  booking: any | undefined;
  bookedRoomData: any | undefined;
}

export const initialState: State = {
  booking: undefined,
  bookedRoomData: undefined,
};

export const reducer = createReducer<State, Action>(
  initialState,
  on(setAvailableRoomForBooking, (state, { data }) => {
    return {
      ...state,
      booking: data,
    };
  }),
  on(getBookedRoomSuccess, (state, { data }) => {
    return {
      ...state,
      bookedRoomData: data,
    };
  })
);
