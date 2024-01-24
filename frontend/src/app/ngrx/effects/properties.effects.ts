import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { SnackBarService } from '../services/snackbar.service';
import {
  addProperty,
  addPropertyImageId,
  createPropertyRequest,
  deleteAPropertyImage,
  deleteAPropertyImageRequest,
  deleteProperty,
  deletePropertyRequest,
  getPropertiesRequest,
  getPropertyListRequest,
  getPropertyRequest,
  getPublicPropertyRequest,
  setAPropertyImageAsPrimaryRequest,
  setProperties,
  setProperty,
  setPropertyList,
  updateProperty,
  updatePropertyRequest,
  uploadPropertyImageRequest,
} from '../actions/properties.actions';
import { PropertiesService } from '../services/properties.service';
import { Property } from '../reducers/properties.reducers';
import { AttachmentsService } from '../services/attachments.service';
import { createRoomRequest } from '../actions/rooms.actions';
import { PropertySummaryInfo } from '../../shared/interfaces/property';

@Injectable()
export class PropertiesEffects {
  getPropertiesRequest$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getPropertiesRequest),
        mergeMap((action) =>
          this.propertiesService.getProperties().pipe(
            switchMap((properties: Property[]) => {
              if (properties.length === 0) {
                this.store.dispatch(createPropertyRequest());
              } else {
                this.store.dispatch(
                  setProperties({
                    properties,
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

  getPropertyList$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getPropertyListRequest),
        mergeMap((action) =>
          this.propertiesService.getPropertyList(action.request).pipe(
            switchMap((properties: PropertySummaryInfo[]) => {
              this.store.dispatch(
                setPropertyList({
                  properties,
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

  getPropertyRequest$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getPropertyRequest),
        mergeMap((action) =>
          this.propertiesService.getProperty(action.propertyId).pipe(
            switchMap((property: Property) => {
              this.store.dispatch(
                setProperty({
                  property,
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

  getPublicPropertyRequest$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getPublicPropertyRequest),
        mergeMap((action) =>
          this.propertiesService.getPublicProperty(action.propertyId).pipe(
            switchMap((property: Property) => {
              this.store.dispatch(
                setProperty({
                  property,
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

  createPropertyRequest$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createPropertyRequest),
        mergeMap((action) =>
          this.propertiesService.insertProperty().pipe(
            switchMap((property) => {
              this.store.dispatch(
                addProperty({
                  property: {
                    propertyId: property.id,
                    name: undefined,
                    propertyType: undefined,
                    imageIds: undefined,
                    description: undefined,
                    keywords: undefined,
                    updatedAt: new Date().toString(),
                  } as Property,
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

  updatePropertyRequest$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updatePropertyRequest),
        mergeMap((action) => {
          return this.propertiesService
            .updateProperty(action.propertyId, action.data)
            .pipe(
              switchMap((property) => {
                this.store.dispatch(
                  updateProperty({
                    propertyId: action.propertyId,
                    updatedProperty: property,
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

  uploadPropertyImage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(uploadPropertyImageRequest),
        mergeMap((action) =>
          this.attachmentsService
            .insertPropertyImage(action.propertyId, action.file)
            .pipe(
              switchMap((imageId) => {
                this.store.dispatch(
                  addPropertyImageId({
                    propertyId: action.propertyId,
                    imageId,
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
        ofType(setAPropertyImageAsPrimaryRequest),
        mergeMap((action) => {
          return this.propertiesService
            .reorderImage(action.propertyId, action.imageId)
            .pipe(
              switchMap((property) => {
                this.store.dispatch(
                  updateProperty({
                    propertyId: action.propertyId,
                    updatedProperty: property,
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
        ofType(deleteAPropertyImageRequest),
        mergeMap((action) =>
          this.attachmentsService
            .deletePropertyImage(
              action.propertyId,
              action.roomId,
              action.imageId
            )
            .pipe(
              switchMap((r) => {
                this.store.dispatch(deleteAPropertyImage(action));
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

  addProperty$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addProperty),
        mergeMap((action) => {
          this.store.dispatch(
            createRoomRequest({ propertyId: action.property.propertyId })
          );
          return of();
        })
      ),
    { dispatch: false }
  );

  deletePropertyRequest$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deletePropertyRequest),
        mergeMap((action) => {
          this.propertiesService.deleteProperty(action.propertyId).subscribe(
            () => {
              this.store.dispatch(
                deleteProperty({
                  propertyId: action.propertyId,
                })
              );
            },
            catchError((e) => {
              this.snackBar.openSnackBar(e.error.failureType, 'Error');
              return EMPTY;
            })
          );

          return of();
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private propertiesService: PropertiesService,
    private attachmentsService: AttachmentsService,
    private store: Store,
    private router: Router,
    private snackBar: SnackBarService
  ) {}
}
