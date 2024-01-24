import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { Room, UpdateRoom } from '../../../../../ngrx/reducers/rooms.reducers';
import { Bed, BedData } from '../../../../../ngrx/reducers/beds.reducers';
import { TagUpdate, UpdatePropertyData } from '../../model/sign-up.data';
import { CustomDialogComponent } from '../custom-dialog/custom-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { roomsSelector } from '../../../../../ngrx/selectors/rooms.selectors';
import { Subscription } from 'rxjs';
import { bedsSelector } from '../../../../../ngrx/selectors/beds.selectors';
import {
  propertyId,
  dirtyInputs,
} from '../../../../../ngrx/selectors/properties.selectors';
import {
  createRoomRequest,
  deleteARoomImageRequest,
  deleteRoomRequest,
  setARoomImageAsPrimaryRequest,
  updateRoomRequest,
  uploadRoomImage,
} from '../../../../../ngrx/actions/rooms.actions';
import { updatePropertyRequest } from '../../../../../ngrx/actions/properties.actions';

@Component({
  selector: 'app-insert-room-form',
  templateUrl: './insert-room-form.component.html',
  styleUrls: ['./insert-room-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InsertRoomFormComponent {
  public propertyId: string;
  public rooms: Room[] | undefined;
  public numberOfRooms: number;
  public beds: BedData[] | undefined;
  private subscription = new Subscription();
  public dirtyInputs = this.store.pipe(select(dirtyInputs));

  constructor(
    public dialog: MatDialog,
    private store: Store,
    private cd: ChangeDetectorRef
  ) {
    this.subscription.add(
      this.store.pipe(select(propertyId)).subscribe((id) => {
        this.propertyId = id;
      })
    );

    this.subscription.add(
      this.store.pipe(select(roomsSelector)).subscribe((rooms) => {
        this.rooms = rooms;
        this.numberOfRooms = 0;
        rooms?.forEach((item: Room) => {
          this.numberOfRooms += item.quantity;
        });
        this.cd.markForCheck();
      })
    );

    this.subscription.add(
      this.store.pipe(select(bedsSelector)).subscribe((beds) => {
        this.beds = beds;
      })
    );
  }

  addNewRoom(): void {
    this.store.dispatch(
      createRoomRequest({
        propertyId: this.propertyId,
      })
    );
  }

  trackRooms(index, item): number {
    return item.id;
  }

  setImageAsPrimary($event: {
    propertyId: string;
    roomId: string | undefined;
    imageId: string;
  }): void {
    this.store.dispatch(
      setARoomImageAsPrimaryRequest({
        propertyId: $event.propertyId,
        roomId: $event.roomId,
        imageId: $event.imageId,
      })
    );
  }

  deleteImage($event: {
    propertyId: string;
    roomId: string | undefined;
    imageId: string;
  }): void {
    this.store.dispatch(
      deleteARoomImageRequest({
        propertyId: $event.propertyId,
        roomId: $event.roomId,
        imageId: $event.imageId,
      })
    );
  }

  deleteRoom($event: {
    propertyId: string;
    roomId: string;
    roomDescription: string;
  }): void {
    const dialogRef = this.dialog.open(CustomDialogComponent, {
      width: '639.72px',
      panelClass: 'custom-dialog',
      data: {
        title: $localize`:Delete room text@@deleteRoom:Delete room`,
        content:
          $localize`:Are you sure you want to delete room@@sureToDeleteRoomText:Are you sure you want to delete room: "` +
          ($event.roomDescription !== ''
            ? $event.roomDescription
            : $localize`:Room@@roomTitle:Room`) +
          '" ?',
        footerButtonName: $localize`:delete generic text@@deleteGenericText:DELETE`,
      },
    });

    dialogRef.componentInstance.onButtonClicked.subscribe(() => {
      this.store.dispatch(
        deleteRoomRequest({
          propertyId: $event.propertyId,
          roomId: $event.roomId,
        })
      );
      dialogRef.close();
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  tagUpdated($event: TagUpdate): void {
    if ($event.roomId) {
      this.updateRoomEmitter({
        data: {
          propertyId: $event.propertyId,
          id: $event.roomId,
          addTag: $event.tagAdded,
          removeTag: $event.tagDeleted,
        },
      });
    } else {
      this.updatePropertyRequest({
        propertyId: $event.propertyId,
        data: { addTag: $event.tagAdded, removeTag: $event.tagDeleted },
      });
    }
  }

  newRoomImageUploaded($event: {
    propertyId: string;
    roomId: string;
    file: File;
  }): void {
    this.store.dispatch(
      uploadRoomImage({
        propertyId: $event.propertyId,
        roomId: $event.roomId,
        file: $event.file,
      })
    );
  }

  updateRoomEmitter($event: { data: UpdateRoom }): void {
    this.store.dispatch(
      updateRoomRequest({
        propertyId: $event.data.propertyId,
        roomId: $event.data.id,
        data: $event.data,
      })
    );
  }

  updatePropertyRequest($event: {
    propertyId: string;
    data: UpdatePropertyData;
  }): void {
    this.store.dispatch(
      updatePropertyRequest({
        propertyId: $event.propertyId,
        data: $event.data,
      })
    );
  }
}
