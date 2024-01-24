import {
  ChangeDetectorRef,
  Component,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { Room, UpdateRoom } from '../../../../../ngrx/reducers/rooms.reducers';
import { RatePlan, UpdatePropertyData } from '../../model/sign-up.data';
import { Validators } from '@angular/forms';
import { float } from '../../../../../shared/utils';
import { select, Store } from '@ngrx/store';
import {
  propertyId,
  propertyRatePlan,
  propertyDiscountForTheFirstFiveGuests,
} from '../../../../../ngrx/selectors/properties.selectors';
import { Subscription } from 'rxjs';
import { roomsSelector } from '../../../../../ngrx/selectors/rooms.selectors';
import { updateRoomRequest } from '../../../../../ngrx/actions/rooms.actions';
import { updatePropertyRequest } from '../../../../../ngrx/actions/properties.actions';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-property-overview',
  templateUrl: './property-overview.component.html',
  styleUrls: ['./property-overview.component.scss'],
})
export class PropertyOverviewComponent {
  public propertyId: string;
  public rooms: Room[];
  public discountFiveGuests: boolean;
  public validators = Validators;
  public subscription = new Subscription();
  public showIcons = false;
  public ratePlan: RatePlan;
  public initialRoomPrice: number;
  public roomDiscount: number;
  public priceAfterDiscount: number;
  public priceAfterNonRefundableDiscount: number;
  public priceWithGroupDiscount: number;
  public priceWithWeeklyPlanDiscount: number;

  constructor(
    private store: Store,
    @Inject(PLATFORM_ID) private platformId: string,
    private cd: ChangeDetectorRef
  ) {
    this.showIcons = isPlatformBrowser(platformId);
    this.subscription.add(
      this.store.pipe(select(propertyRatePlan)).subscribe((plan) => {
        if (plan) {
          this.ratePlan = plan;
        }
      })
    );

    this.subscription.add(
      this.store.pipe(select(roomsSelector)).subscribe((rooms) => {
        this.rooms = rooms;
        this.cd.markForCheck();
      })
    );

    this.subscription.add(
      this.store
        .pipe(select(propertyDiscountForTheFirstFiveGuests))
        .subscribe((discountFiveGuests) => {
          this.discountFiveGuests = discountFiveGuests;
          this.cd.markForCheck();
        })
    );

    this.subscription.add(
      this.store.pipe(select(propertyId)).subscribe((id) => {
        this.propertyId = id;
      })
    );
  }

  calculateEarnings(): string {
    return float(
      this.priceWithWeeklyPlanDiscount -
        (this.priceWithWeeklyPlanDiscount * 7) / 100
    );
  }

  calculateRoomDiscount(room: Room): string {
    if (room) {
      this.initialRoomPrice = room.price;
      this.roomDiscount = room.discountPlan.hasDiscount
        ? room.discountPlan.discountPercentage
        : 0;
      this.priceAfterDiscount = this.roundNumber(
        room.price - (room.price * this.roomDiscount) / 100
      );
      if (this.discountFiveGuests) {
        this.priceAfterDiscount = this.roundNumber(
          this.priceAfterDiscount - (this.priceAfterDiscount * 20) / 100
        );
      }
    }

    if (this.ratePlan) {
      this.priceAfterNonRefundableDiscount = this.roundNumber(
        this.priceAfterDiscount -
          (this.priceAfterDiscount * this.ratePlan.nonRefundable.discount) / 100
      );

      this.priceWithGroupDiscount = this.roundNumber(
        this.priceAfterNonRefundableDiscount -
          (this.priceAfterNonRefundableDiscount *
            this.ratePlan.pricePerGroup.discountForOne) /
            100
      );

      this.priceWithWeeklyPlanDiscount = this.roundNumber(
        this.priceWithGroupDiscount -
          this.priceWithGroupDiscount *
            (this.ratePlan.weeklyPlan.discount / 100)
      );
    }

    return float(
      ((this.initialRoomPrice - this.priceWithWeeklyPlanDiscount) /
        this.initialRoomPrice) *
        100
    );
  }

  roundNumber(value): number {
    return value.toFixed(2);
  }

  floatString(value: number): string {
    return float(value);
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
