import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  BedInfo,
  UpdateRoom,
} from '../../../../../ngrx/reducers/rooms.reducers';
import { Bed, BedData } from '../../../../../ngrx/reducers/beds.reducers';
import { BedType } from '../../model/bed-type.enum';

@Component({
  selector: 'app-bed-type-info',
  templateUrl: './bed-type-info.component.html',
  styleUrls: ['./bed-type-info.component.scss'],
})
export class BedTypeInfoComponent implements OnInit, OnChanges {
  @Input() propertyId: string;
  @Input() roomId: string;
  @Input() bed: BedData;
  @Input() roomBeds: BedInfo[];

  @Output() updateRoomEmitter = new EventEmitter<{ data: UpdateRoom }>();

  public quantity = 0;
  public BedType = BedType;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.bed || changes.roomBeds) {
      if (this.roomBeds && this.bed) {
        const bedMatch = this.roomBeds.find(
          (rb) => rb.bedId === this.bed.bedId
        );
        if (bedMatch) {
          this.quantity = bedMatch.bedQuantity;
        }
      }
    }
  }

  ngOnInit(): void {}

  newBedQuantity($event: { elementId: string; newQuantity: number }): void {
    this.updateRoomEmitter.emit({
      data: {
        propertyId: this.propertyId,
        id: this.roomId,
        addBed: {
          bedId: $event.elementId,
          bedQuantity: $event.newQuantity,
        },
      } as UpdateRoom,
    });
  }
}
