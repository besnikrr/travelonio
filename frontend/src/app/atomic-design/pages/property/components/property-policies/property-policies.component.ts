import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import {
  PropertyPoliciesData,
  RatePlan,
} from '../../../sign-up/model/sign-up.data';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { getCurrentRouteState } from 'src/app/ngrx/reducers';
import { subtractDaysFromDate } from 'src/app/shared/utils';

@Component({
  selector: 'app-property-policies',
  templateUrl: './property-policies.component.html',
  styleUrls: ['./property-policies.component.scss'],
})
export class PropertyPoliciesComponent implements OnInit {
  @Input() ratePlan: RatePlan | undefined;
  @Input() propertyPoliciesData: PropertyPoliciesData | undefined;
  public showIcons = false;
  private subscription = new Subscription();
  startDate: string;

  constructor(
    @Inject(PLATFORM_ID) private platformId: string,
    private router: Router,
    private store: Store
  ) {
    this.showIcons = isPlatformBrowser(platformId);
    this.subscription.add(
      this.store.pipe(select(getCurrentRouteState)).subscribe((routes) => {
        // @ts-ignore
        const queries = routes.state.queryParams;
        this.startDate = queries.startDate;
      })
    );
  }

  ngOnInit(): void {}

  ratePlanType() {
    if (!this.ratePlan) {
      return;
    }
    if (
      this.ratePlan.nonRefundable.setNonRefundable &&
      this.ratePlan.refundable.fullyRefundable
    ) {
      return $localize`:This property offers two tariffs with different cancellation rules. See applicable tariff in the room selection overview @@cancelationBoth: This property offers two tariffs with different cancellation rules. See applicable tariff in the room selection overview`;
    }
    if (this.ratePlan.nonRefundable.setNonRefundable) {
      return $localize`:This property does not allow cancellations after booking. In case of no-shows the full amount will be charged@@nonRefundable: This property does not allow cancellations after booking. In case of no-shows the full amount will be charged`;
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

  setHouseRules() {
    let houseRules = [];
    if (this.propertyPoliciesData) {
      if (
        this.propertyPoliciesData.petsAllowed !== null &&
        this.propertyPoliciesData.petsAllowed === true
      ) {
        houseRules.push($localize`:pets @@pets: pets`);
      } else {
        houseRules.push($localize`:No pets @@noPets: No pets`);
      }
      if (
        this.propertyPoliciesData.eventsAllowed !== null &&
        this.propertyPoliciesData.eventsAllowed === true
      ) {
        houseRules.push($localize`:Parties @@parties: Parties`);
      } else {
        houseRules.push($localize`:No parties @@noParties: No parties`);
      }
      if (
        this.propertyPoliciesData.smokingAllowed !== null &&
        this.propertyPoliciesData.smokingAllowed === true
      ) {
        houseRules.push($localize`:Smoking @@smoking: Smoking`);
      } else {
        houseRules.push($localize`:No smoking @@noSmoking: No smoking`);
      }
    }
    return houseRules;
  }

  navigateToCancelOptions() {
    this.router.navigate(['/cancel-options']);
  }
}
