import {
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { Room, UpdateRoom } from '../../../../../ngrx/reducers/rooms.reducers';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { UpdatePropertyData } from '../../model/sign-up.data';
import { select, Store } from '@ngrx/store';
import { roomsSelector } from '../../../../../ngrx/selectors/rooms.selectors';
import { Subscription } from 'rxjs';
import {
  dirtyInputs,
  propertyDiscountForTheFirstFiveGuests,
  propertyId,
} from '../../../../../ngrx/selectors/properties.selectors';
import { updateRoomRequest } from '../../../../../ngrx/actions/rooms.actions';
import { updatePropertyRequest } from '../../../../../ngrx/actions/properties.actions';

@Component({
  selector: 'app-rooms-prices',
  templateUrl: './rooms-prices.component.html',
  styleUrls: ['./rooms-prices.component.scss'],
})
export class RoomsPricesComponent implements OnInit, OnChanges {
  public propertyId: string;
  public rooms: Room[];
  public discountForTheFirstFiveGuests: boolean | undefined;

  public minDateFrom: Date;
  public validators = Validators;
  private subscription = new Subscription();
  public dirtyInputs = this.store.pipe(select(dirtyInputs));

  constructor(private store: Store, private cd: ChangeDetectorRef) {
    this.minDateFrom = new Date();

    this.subscription.add(
      this.store.pipe(select(roomsSelector)).subscribe((rooms) => {
        this.rooms = rooms;
        this.cd.markForCheck();
      })
    );

    this.subscription.add(
      this.store.pipe(select(propertyId)).subscribe((id) => {
        this.propertyId = id;
      })
    );

    this.subscription.add(
      this.store
        .pipe(select(propertyDiscountForTheFirstFiveGuests))
        .subscribe((discount) => {
          this.discountForTheFirstFiveGuests = discount;
        })
    );
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {}

  roomDiscountSwitchChanged($event: MatRadioChange, roomId: string): void {
    this.updateRoomEmitter({
      data: {
        propertyId: this.propertyId,
        id: roomId,
        discountPlan: {
          hasDiscount: $event.value === 'yes',
          discountPercentage: 0,
        },
      },
    });

    if ($event.value === 'no') {
      this.updateRoomEmitter({
        data: {
          propertyId: this.propertyId,
          id: roomId,
          discountPlan: {
            validUntil: '',
            validFrom: '',
          },
        },
      });
    }
  }

  roomDiscountPercentageChanged($event: string, roomId: string): void {
    if (!isNaN(Number($event))) {
      this.updateRoomEmitter({
        data: {
          propertyId: this.propertyId,
          id: roomId,
          discountPlan: { discountPercentage: +$event },
        },
      });
    }
  }

  roomDiscountValidFromChanged(
    $event: MatDatepickerInputEvent<unknown, unknown | null>,
    roomId: string
  ): void {
    this.updateRoomEmitter({
      data: {
        propertyId: this.propertyId,
        id: roomId,
        discountPlan: { validFrom: $event.value as string },
      },
    });
  }

  roomDiscountValidUntilChanged(
    $event: MatDatepickerInputEvent<unknown, unknown | null>,
    roomId: string
  ): void {
    this.updateRoomEmitter({
      data: {
        propertyId: this.propertyId,
        id: roomId,
        discountPlan: { validUntil: $event.value as string },
      },
    });
  }

  discountForTheFirstFiveGuestsChanged($event: MatCheckboxChange): void {
    this.updatePropertyRequest({
      propertyId: this.propertyId,
      data: { discountForTheFirstFiveGuests: $event.checked },
    });
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
