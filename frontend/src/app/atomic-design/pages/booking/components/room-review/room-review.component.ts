import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { reviewDataSelector } from '../../../../../ngrx/selectors/booking.selectors';
import { environment } from '../../../../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { Amenities } from '../../../sign-up/model/amenities.enum';
import { subtractDaysFromDate } from '../../../../../shared/utils';
import { getCurrentRouteState } from '../../../../../ngrx/reducers';

export interface ReviewData {
  propertyId: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  amenities: { name: string; distance?: number }[];
  refundPercentage: number | undefined;
  startBookingDate: string;
  maxGuests: number;
  roomImageId: string | undefined;
}

@Component({
  selector: 'app-room-review',
  templateUrl: './room-review.component.html',
  styleUrls: ['./room-review.component.scss'],
})
export class RoomReviewComponent {
  private subscription = new Subscription();
  public showIcons = false;
  public baseUrl = environment.baseUrl;

  public reviewData;
  public Amenities = Amenities;
  startDate;

  constructor(
    private store: Store,
    @Inject(PLATFORM_ID) private platformId: string
  ) {
    this.showIcons = isPlatformBrowser(platformId);
    if (isPlatformBrowser(platformId)) {
      this.subscription.add(
        this.store.pipe(select(getCurrentRouteState)).subscribe((routes) => {
          // @ts-ignore
          const queries = routes.state.queryParams;
          this.startDate = queries.startDate;
        })
      );

      this.subscription.add(
        this.store.pipe(select(reviewDataSelector)).subscribe((booking) => {
          this.reviewData = {
            propertyId: booking.propertyId,
            roomId: booking.rooms[0].id,
            checkIn:
              booking.propertyPoliciesData.checkIn.from +
              ' - ' +
              booking.propertyPoliciesData.checkIn.to,
            checkOut:
              booking.propertyPoliciesData.checkOut.from +
              ' - ' +
              booking.propertyPoliciesData.checkOut.to,
            amenities: booking.aminityIds,
            startBookingDate: new Date(booking.startBookingDate).toDateString(),
            maxGuest: booking.propertyPoliciesData.potentialGuestNumber,
            roomImageId: booking.rooms[0].imageIds[0],
            propertyType: booking.propertyType,
            ratePlan: booking.ratePlan,
          };
        })
      );
    }
  }

  ratePlanType() {
    if (!this.reviewData.ratePlan) {
      return;
    }
    if (
      this.reviewData.ratePlan.nonRefundable.setNonRefundable &&
      this.reviewData.ratePlan.refundable.fullyRefundable
    ) {
      return $localize`:This property offers two tariffs with different cancellation rules. See applicable tariff in the room selection overview @@cancelationBoth: This property offers two tariffs with different cancellation rules. See applicable tariff in the room selection overview`;
    }
    if (this.reviewData.ratePlan.nonRefundable.setNonRefundable) {
      return $localize`:This property does not allow cancellations after booking. In case of no-shows the full amount will be charged@@nonRefundable: This property does not allow cancellations after booking. In case of no-shows the full amount will be charged`;
    }
    if (this.reviewData.ratePlan.refundable.fullyRefundable) {
      if (this.startDate) {
        let result = subtractDaysFromDate(
          this.startDate,
          this.reviewData.ratePlan.refundable.cancellationPolicy
        );
        return (
          $localize`:You can cancel this reservation free of charge before @@fullyRefundableReservationCheckIn: You can cancel this reservation free of charge before ` +
          result
        );
      } else if (
        this.reviewData.ratePlan.refundable.cancellationPolicy === 0 ||
        this.reviewData.ratePlan.refundable.cancellationPolicy === null
      ) {
        return $localize`:You can cancel this reservation free of charge until check-in day@@fullyRefundableReservationCheckInDaysZero: You can cancel this reservation free of charge until check-in day`;
      } else {
        return (
          $localize`:You can cancel this reservation free of charge @@fullyRefundableReservationWithoutCheckIn: You can cancel this reservation free of charge ` +
          `${this.reviewData.ratePlan.refundable.cancellationPolicy}` +
          $localize`:days before check-in date@@fullyRefundableReservationDays: days before check-in date`
        );
      }
    }
  }
}
