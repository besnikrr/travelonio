import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { SnackBarService } from '../services/snackbar.service';
import {
  addRoom,
  addRoomImageId,
  createRoomRequest,
  deleteARoomImage,
  deleteARoomImageRequest,
  deleteRoom,
  deleteRoomRequest,
  getRoomsRequest,
  setARoomImageAsPrimaryRequest,
  setRooms,
  updateRoom,
  updateRoomRequest,
  uploadRoomImage
} from '../actions/rooms.actions';
import { BedInfo, Room, UpdateRoom } from '../reducers/rooms.reducers';
import { AttachmentsService } from '../services/attachments.service';
import { RoomService } from '../services/rooms.service';
import { bedsSelector } from '../selectors/beds.selectors';

@Injectable()
export class RoomsEffects {
  getRoomsRequest$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getRoomsRequest),
        mergeMap((action) =>
          this.roomsService.getRooms(action.propertyId).pipe(
            switchMap((rooms: Room[]) => {
              this.store.dispatch(
                setRooms({
                  rooms
                })
              );
              return of();
            }),
            catchError((e) => {
              this.snackBar.openSnackBar(e.error.failureType, 'Error');
              return EMPTY;
            })
          )
        )
      ),
    { dispatch: false }
  );

  createRoomRequest$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createRoomRequest),
        mergeMap((action) =>
          this.roomsService.insertRoom(action.propertyId).pipe(
            switchMap((room: Room) => {
              this.store.dispatch(
                addRoom({
                  room
                })
              );
              return of();
            }),
            catchError((e) => {
              this.snackBar.openSnackBar(e.error.failureType, 'Error');
              return EMPTY;
            })
          )
        )
      ),
    { dispatch: false }
  );

  updateRoomRequest$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateRoomRequest),
        withLatestFrom(this.store.select(bedsSelector)),
        mergeMap(([action, beds]) =>
          this.roomsService
            .updateRoom(action.propertyId, action.roomId, action.data)
            .pipe(
              switchMap((room: Room) => {
                this.store.dispatch(
                  updateRoom({
                    propertyId: action.propertyId,
                    roomId: action.roomId,
                    data: room
                  })
                );

                // run this code only if a new bed type is added to a room
                if (action.data.addBed) {
                  const newPeopleNumber = room.beds
                    .map((roomBed: BedInfo) => {
                      const matchBed = beds.find(
                        (b) => b.bedId === roomBed.bedId
                      );
                      if (matchBed) {
                        return (
                          roomBed.bedQuantity *
                          (matchBed.infants +
                            matchBed.children +
                            matchBed.adults)
                        );
                      }
                      return 0;
                    })
                    .reduce((sum, current) => sum + current, 0);
                  this.store.dispatch(
                    updateRoomRequest({
                      propertyId: action.propertyId,
                      roomId: action.roomId,
                      data: { peopleQuantity: newPeopleNumber } as UpdateRoom
                    })
                  );
                }
                return of();
              }),
              catchError((e) => {
                this.snackBar.openSnackBar(e.error.failureType, 'Error');
                return EMPTY;
              })
            )
        )
      ),
    { dispatch: false }
  );

  deleteRoomRequest$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteRoomRequest),
        mergeMap((action) =>
          this.roomsService.deleteRoom(action.propertyId, action.roomId).pipe(
            switchMap(() => {
              this.store.dispatch(
                deleteRoom({
                  propertyId: action.propertyId,
                  roomId: action.roomId
                })
              );
              return of();
            }),
            catchError((e) => {
              this.snackBar.openSnackBar(e.error.failureType, 'Error');
              return EMPTY;
            })
          )
        )
      ),
    { dispatch: false }
  );

  uploadRoomImage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(uploadRoomImage),
        mergeMap((action) =>
          this.attachmentsService
            .insertRoomImage(action.propertyId, action.roomId, action.file)
            .pipe(
              switchMap((imageId) => {
                this.store.dispatch(
                  addRoomImageId({
                    propertyId: action.propertyId,
                    roomId: action.roomId,
                    imageId
                  })
                );
                return of();
              }),
              catchError((e) => {
                this.snackBar.openSnackBar(e.error.failureType, 'Error');
                return EMPTY;
              })
            )
        )
      ),
    { dispatch: false }
  );

  setAnImageAsPrimaryRequest$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(setARoomImageAsPrimaryRequest),
        mergeMap((action) => {
          return this.roomsService
            .reorderImage(action.propertyId, action.roomId, action.imageId)
            .pipe(
              switchMap((room) => {
                this.store.dispatch(
                  updateRoom({
                    propertyId: action.propertyId,
                    roomId: action.roomId,
                    data: room
                  })
                );
                return of();
              }),
              catchError((e) => {
                this.snackBar.openSnackBar(e.error.failureType, 'Error');
                return EMPTY;
              })
            );
        })
      ),
    { dispatch: false }
  );

  deleteAnImageRequest$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteARoomImageRequest),
        mergeMap((action) =>
          this.attachmentsService
            .deletePropertyImage(
              action.propertyId,
              action.roomId,
              action.imageId
            )
            .pipe(
              switchMap((r) => {
                this.store.dispatch(deleteARoomImage(action));
                return of();
              }),
              catchError((e) => {
                this.snackBar.openSnackBar(e.error.failureType, 'Error');
                return EMPTY;
              })
            )
        )
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private roomsService: RoomService,
    private attachmentsService: AttachmentsService,
    private store: Store,
    private router: Router,
    private snackBar: SnackBarService
  ) {
  }
}
