import { Action, createReducer, on } from '@ngrx/store';
import {
  addRoom,
  addRoomImageId,
  deleteARoomImage,
  deleteRoom,
  setRooms,
  updateRoom,
} from '../actions/rooms.actions';
import { Bed } from './beds.reducers';

export interface Room {
  propertyId: string;
  id: string;
  roomType: string;
  bookedRooms: number;
  description: string;
  price: number;
  beds: BedInfo[];
  imageIds: string[];
  quantity: number;
  peopleQuantity: number;
  discountPlan?: RoomDiscountPlan;
}

export interface BedInfo {
  bedId: string;
  bedQuantity: number;
  bedType: string;
  adults: number;
  children: number;
  infants: number;
  dimensions: string;
  icon: string;
}

export interface UpdateRoom {
  propertyId: string;
  id: string;
  roomType?: string;
  totalRooms?: number;
  bookedRooms?: number;
  description?: string;
  price?: number;
  addBed?: BedInfo;
  removeBedIds?: string[];
  addImageIds?: string[];
  removeImageIds?: string[];
  quantity?: number;
  peopleQuantity?: number;
  discountPlan?: RoomDiscountPlan;
  addTag?: string | undefined;
  removeTag?: string | undefined;
}

export interface RoomDiscountPlan {
  hasDiscount?: boolean;
  discountPercentage?: number;
  validFrom?: string;
  validUntil?: string;
}

export interface State {
  rooms: Room[] | undefined;
}

export const initialState: State = {
  rooms: undefined,
};

export const reducer = createReducer<State, Action>(
  initialState,
  on(setRooms, (state, { rooms }) => {
    return {
      ...state,
      rooms,
    };
  }),
  on(addRoom, (state, { room }) => {
    return {
      ...state,
      rooms: state.rooms ? [...state.rooms, room] : [room],
    };
  }),
  on(updateRoom, (state, { propertyId, roomId, data: updatedRoom }) => {
    return {
      ...state,
      rooms: state.rooms
        ? state.rooms.map((oldRoom) => {
            if (oldRoom.id === roomId) {
              return updatedRoom;
            }
            return oldRoom;
          })
        : undefined,
    };
  }),
  on(addRoomImageId, (state, { propertyId, roomId, imageId }) => ({
    ...state,
    rooms: state.rooms
      ? state.rooms.map((room) => {
          if (room.id === roomId) {
            return { ...room, imageIds: [...room.imageIds, imageId] };
          }
          return room;
        })
      : [],
  })),
  on(deleteARoomImage, (state, { propertyId, roomId, imageId }) => ({
    ...state,
    rooms: state.rooms
      ? state.rooms.map((room) => {
          if (room.id === roomId) {
            return {
              ...room,
              imageIds: room.imageIds.filter((id) => id !== imageId),
            };
          }
          return room;
        })
      : [],
  })),
  on(deleteRoom, (state, { propertyId, roomId }) => ({
    ...state,
    rooms: state.rooms ? state.rooms.filter((room) => room.id !== roomId) : [],
  }))
);
