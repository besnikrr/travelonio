import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Room } from '../../../../../ngrx/reducers/rooms.reducers';
import { RatePlan } from '../../../sign-up/model/sign-up.data';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { BedType } from '../../../sign-up/model/bed-type.enum';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { getCurrentRouteState } from 'src/app/ngrx/reducers';
import { subtractDaysFromDate } from 'src/app/shared/utils';

@Component({
  selector: 'app-property-availability',
  templateUrl: './property-availability.component.html',
  styleUrls: ['./property-availability.component.scss'],
})
export class PropertyAvailabilityComponent implements OnInit {
  @Input() ratePlan: RatePlan | undefined;
  @Input() rooms: Room[] | undefined;
  @Input() roomQuantityForBooking:
    | {
        roomId: string;
        roomQuantity: number;
      }
    | undefined;

  public baseUrl = environment.baseUrl;
  @Output() setRoomQuantityForBooking = new EventEmitter<
    | {
        roomId: string;
        roomQuantity: number;
      }
    | undefined
  >();
  BedType = BedType;
  startDate: string;
  private subscription = new Subscription();

  constructor(private router: Router, private store: Store) {
    this.subscription.add(
      this.store.pipe(select(getCurrentRouteState)).subscribe((routes) => {
        // @ts-ignore
        const queries = routes.state.queryParams;
        this.startDate = queries.startDate;
      })
    );
  }

  ngOnInit(): void {}

  ratePlanType(): string {
    if (!this.ratePlan) {
      return;
    }
    if (
      this.ratePlan.nonRefundable.setNonRefundable &&
      this.ratePlan.refundable.fullyRefundable
    ) {
      return $localize`:This property offers two tariffs with different cancellation rules. See applicable tariff in the room selection overview@@cancelationBoth: This property offers two tariffs with different cancellation rules. See applicable tariff in the room selection overview`;
    }
    if (this.ratePlan.nonRefundable.setNonRefundable) {
      return $localize`:This property does not allow cancellations after booking. In case of no-shows the full amount will be charged@@cancelationNonRefundable: This property does not allow cancellations after booking. In case of no-shows the full amount will be charged`;
    }
    if (this.ratePlan.refundable.fullyRefundable) {
      if (this.startDate) {
        let result = subtractDaysFromDate(
          this.startDate,
          this.ratePlan.refundable.cancellationPolicy
        );
        return (
          $localize`:You can cancel this reservation free of charge before @@fullyRefundableReservationCheckIn: You can cancel this reservation free of charge before ` +
          result
        );
      } else if (
        this.ratePlan.refundable.cancellationPolicy === 0 ||
        this.ratePlan.refundable.cancellationPolicy === null
      ) {
        return $localize`:You can cancel this reservation free of charge until check-in day@@fullyRefundableReservationCheckInDaysZero: You can cancel this reservation free of charge until check-in day`;
      } else {
        return (
          $localize`:You can cancel this reservation free of charge @@fullyRefundableReservationWithoutCheckIn: You can cancel this reservation free of charge ` +
          `${this.ratePlan.refundable.cancellationPolicy}` +
          $localize`:days before check-in date@@fullyRefundableReservationDays: days before check-in date`
        );
      }
    }
  }

  roomQuantitySelected($event: MatSelectChange, roomId: string): void {
    this.setRoomQuantityForBooking.emit({
      roomQuantity: +$event.value,
      roomId,
    });
  }

  roomQuantitySelectionOpened(): void {
    this.setRoomQuantityForBooking.emit(undefined);
  }

  navigateToRoomBokingPage(propertyId: string, roomId: string): void {
    this.router.navigate(
      ['booking/property/' + propertyId + '/rooms/' + roomId + '/review'],
      {
        queryParams: {
          rooms: this.roomQuantityForBooking
            ? this.roomQuantityForBooking.roomQuantity
            : 1,
        },
        queryParamsHandling: 'merge',
      }
    );
  }
}
