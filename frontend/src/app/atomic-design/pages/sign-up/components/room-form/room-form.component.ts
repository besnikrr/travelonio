import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { RoomDescriptions, RoomTags } from '../../model/room-descriptions';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Room, UpdateRoom } from '../../../../../ngrx/reducers/rooms.reducers';
import { MatOptionSelectionChange } from '@angular/material/core/option/option';
import { Bed } from '../../../../../ngrx/reducers/beds.reducers';
import { TagUpdate } from '../../model/sign-up.data';

@Component({
  selector: 'app-room-form',
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomFormComponent implements OnInit {
  @Input() room: Room;
  @Input() propertyId: string;
  @Input() roomOrderNumber: number;
  @Input() allBedTypes: Bed[];
  @Input() tags = [];
  @Input() dirtyInputs: Observable<boolean>;
  @Output() public setImageAsPrimaryEmitter = new EventEmitter<{
    propertyId: string;
    roomId: string | undefined;
    imageId: string;
  }>();
  @Output() public deleteImageEmitter = new EventEmitter<{
    propertyId: string;
    roomId: string | undefined;
    imageId: string;
  }>();
  @Output() updateRoomEmitter = new EventEmitter<{ data: UpdateRoom }>();
  @Output() deleteRoomEmitter = new EventEmitter<{
    propertyId: string;
    roomId: string;
    roomDescription: string;
  }>();
  @Output() newImageUploaded = new EventEmitter<{
    propertyId: string;
    roomId: string;
    file: File;
  }>();
  @Output() tagUpdatedEmitter = new EventEmitter<TagUpdate>();
  public selectedRoomId: string;

  roomTags = RoomTags;
  panelOpenState = false;
  myControl = new FormControl();
  options: string[] = RoomDescriptions;
  filteredOptions: Observable<string[]>;
  public validators = Validators;
  public showDeleteIcon = false;

  public otherAmenitiesLabelText = $localize`:What else is included in this room text@@otherAmenitiesLabelText:What else is included in this room`;
  public selectYourAmenitiesText = $localize`:Select your Amenities text@@selectYourAmenitiesText:Select your Amenities`;
  public pricePerNightText = $localize`:Price per night@@roomFormPricePerNight:Price per night:`;
  public enterPriceText = $localize`:Enter price@@enterPriceText:Enter price`;

  @ViewChild('roomDescription') roomDescription: ElementRef;

  constructor() {}

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(this.room.description ? this.room.description : ''),
      map((value) => this._filter(value))
    );
    this.myControl.setValue(this.room.description ? this.room.description : '');
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  selectRoomDescription(event: MatOptionSelectionChange, roomId: string): void {
    this.updateRoomEmitter.emit({
      data: {
        propertyId: this.propertyId,
        id: roomId,
        description: event.source.value,
      } as UpdateRoom,
    });
  }

  onRoomDescription(roomId: string): void {
    this.updateRoomEmitter.emit({
      data: {
        propertyId: this.propertyId,
        id: roomId,
        description: this.myControl.value,
      } as UpdateRoom,
    });
  }

  imageUploaded($event: { propertyId: string; file: File }, id: string): void {
    this.newImageUploaded.emit({
      propertyId: $event.propertyId,
      roomId: id,
      file: $event.file,
    });
  }

  newRoomQuantity($event: { elementId: string; newQuantity: number }): void {
    this.updateRoomEmitter.emit({
      data: {
        propertyId: this.propertyId,
        id: $event.elementId,
        quantity: $event.newQuantity,
      } as UpdateRoom,
    });
  }

  newPeopleQuantity($event: { elementId: string; newQuantity: number }): void {
    this.updateRoomEmitter.emit({
      data: {
        propertyId: this.propertyId,
        id: $event.elementId,
        peopleQuantity: $event.newQuantity,
      } as UpdateRoom,
    });
  }

  pricePerNightChanged($event: string, propertyId: string, id: string): void {
    this.updateRoomEmitter.emit({
      data: {
        propertyId,
        id,
        price: +$event,
      } as UpdateRoom,
    });
  }

  setImageAsPrimary($event: {
    propertyId: string;
    roomId: string | undefined;
    imageId: string;
  }): void {
    this.setImageAsPrimaryEmitter.emit($event);
  }

  deleteImage($event: {
    propertyId: string;
    roomId: string | undefined;
    imageId: string;
  }): void {
    this.deleteImageEmitter.emit($event);
  }

  updateRoom($event: { data: UpdateRoom }): void {
    this.updateRoomEmitter.emit($event);
  }

  deleteRoom(
    $event: Event,
    propertyId: string,
    roomId: string,
    roomDescription: string
  ): void {
    $event.stopPropagation();
    $event.preventDefault();
    this.deleteRoomEmitter.emit({ propertyId, roomId, roomDescription });
  }

  tagUpdated($event: TagUpdate): void {
    this.tagUpdatedEmitter.emit($event);
  }
}
