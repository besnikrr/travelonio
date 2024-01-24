import { createSelector } from '@ngrx/store';
import { AppState } from '../reducers';
import * as rooms from '../reducers/rooms.reducers';

export const roomsSelect = (state: AppState) => state.rooms;

export const roomsSelector = createSelector(
  roomsSelect,
  (state: rooms.State) => state.rooms
);

export const firstRoom = createSelector(roomsSelector, (myRooms) =>
  myRooms ? myRooms[0] : undefined
);
