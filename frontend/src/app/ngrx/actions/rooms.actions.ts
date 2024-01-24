import { createAction, props } from '@ngrx/store';
import { Room, UpdateRoom } from '../reducers/rooms.reducers';

const actionPrefix = '[Rooms actions] ';

export const getRoomsRequest = createAction(
  actionPrefix + 'Get Rooms Request',
  props<{ propertyId: string }>()
);

export const setRooms = createAction(
  actionPrefix + 'Set Rooms',
  props<{ rooms: Room[] }>()
);

export const addRoom = createAction(
  actionPrefix + 'Add Room',
  props<{ room: Room }>()
);

export const createRoomRequest = createAction(
  actionPrefix + 'Create Room Request',
  props<{ propertyId: string }>()
);

export const updateRoomRequest = createAction(
  actionPrefix + 'Update Room Request',
  props<{ propertyId: string; roomId: string; data: UpdateRoom }>()
);

export const updateRoom = createAction(
  actionPrefix + 'Update Room',
  props<{ propertyId: string; roomId: string; data: Room }>()
);

export const uploadRoomImage = createAction(
  actionPrefix + 'Upload property image request',
  props<{ propertyId: string; roomId: string; file: File }>()
);

export const addRoomImageId = createAction(
  actionPrefix + 'set new property image id',
  props<{ propertyId: string; roomId: string; imageId: string }>()
);

export const setARoomImageAsPrimaryRequest = createAction(
  actionPrefix + 'Set an image as primary request',
  props<{ propertyId: string; roomId: string; imageId: string }>()
);

export const deleteARoomImageRequest = createAction(
  actionPrefix + 'Delete an images request',
  props<{ propertyId: string; roomId: string; imageId: string }>()
);

export const deleteARoomImage = createAction(
  actionPrefix + 'Delete an images success',
  props<{ propertyId: string; roomId: string; imageId: string }>()
);

export const deleteRoomRequest = createAction(
  actionPrefix + 'Delete Room Request',
  props<{ propertyId: string; roomId: string }>()
);

export const deleteRoom = createAction(
  actionPrefix + 'Delete Room',
  props<{ propertyId: string; roomId: string }>()
);
