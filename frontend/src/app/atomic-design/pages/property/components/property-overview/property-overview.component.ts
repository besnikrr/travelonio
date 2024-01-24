import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Property } from 'src/app/ngrx/reducers/properties.reducers';
import {
  PropertyPoliciesData,
  RatePlan,
} from '../../../sign-up/model/sign-up.data';
import { select, Store } from '@ngrx/store';
import { getCurrentRouteState } from '../../../../../ngrx/reducers';
import { SearchedGuests } from '../../../../../shared/interfaces/guest';
import { Subscription } from 'rxjs';
import { subtractDaysFromDate } from 'src/app/shared/utils';

@Component({
  selector: 'app-property-overview',
  templateUrl: './property-overview.component.html',
  styleUrls: ['./property-overview.component.scss'],
})
export class PropertyOverviewComponent implements OnInit, OnDestroy {
  @Input() property: Property;
  @Input() name: string;
  @Input() description: string;
  @Input() propertyType: string;
  @Input() propertyPoliciesData: PropertyPoliciesData;
  @Input() ratePlan: RatePlan;
  @Input() country: string;
  @Input() city: string;
  @Input() roomQuantityForBooking:
    | {
        roomId: string;
        roomQuantity: number;
      }
    | undefined;

  startDate: string;
  endDate: string;
  guests: SearchedGuests;
  private subscription = new Subscription();

  constructor(private store: Store) {
    this.subscription.add(
      this.store.pipe(select(getCurrentRouteState)).subscribe((routes) => {
        // @ts-ignore
        const queries = routes.state.queryParams;
        this.guests = {
          adults: isNaN(+queries.adults) ? 0 : +queries.adults,
          children: isNaN(+queries.children) ? 0 : +queries.children,
          infants: isNaN(+queries.infants) ? 0 : +queries.infants,
        };
        this.startDate = queries.startDate;
        this.endDate = queries.endDate;
      })
    );
  }

  ngOnInit(): void {}

  setBreakfast(): string {
    if (this.property?.propertyPoliciesData?.breakfastIncluded) {
      return $localize`:Breakfast is included in the price@@breakfastIsIncluded: Breakfast is included in the price`;
    } else if (this.property?.propertyPoliciesData?.buyBreakfastPossibility) {
      return (
        $localize`:Breakfast can be bought at an extra cost of @@breakfastExtraCostText: Breakfast can be bought at an extra cost of ` +
        +this.property?.propertyPoliciesData?.breakfastPricePerPerson +
        ` €` +
        $localize`: per person@@breakfastExtraCostPerPerson: per person`
      );
    }

    return $localize`:Breakfast is not included in the price and can't be bought@@breakfastNotIncluded: Breakfast is not included in the price and can't be bought`;
  }

  setStaffLanguages(lang: string) {
    switch (lang.trim()) {
      case 'Albanian':
        return $localize`Albanian`;
      case 'Bulgarian':
        return $localize`Bulgarian`;
      case 'Croatian':
        return $localize`Croatian`;
      case 'Czech':
        return $localize`Czech`;
      case 'Danish':
        return $localize`Danish`;
      case 'Dutch':
        return $localize`Dutch`;
      case 'English':
        return $localize`English`;
      case 'Estonian':
        return $localize`Estonian`;
      case 'Finnish':
        return $localize`Finnish`;
      case 'French':
        return $localize`French`;
      case 'German':
        return $localize`German`;
      case 'Greek':
        return $localize`Greek`;
      case 'Hungarian':
        return $localize`Hungarian`;
      case 'Irish':
        return $localize`Irish`;
      case 'Italian':
        return $localize`Italian`;
      case 'Latvian':
        return $localize`Latvian`;
      case 'Lithuanian':
        return $localize`Lithuanian`;
      case 'Maltese':
        return $localize`Maltese`;
      case 'Polish':
        return $localize`Polish`;
      case 'Portuguese':
        return $localize`Portuguese`;
      case 'Romanian':
        return $localize`Romanian`;
      case 'Slovak':
        return $localize`Slovak`;
      case 'Slovenian':
        return $localize`Slovenian`;
      case 'Spanish':
        return $localize`Spanish`;
      case 'Swedish':
        return $localize`Swedish`;
      case 'Chinese (Traditional)':
        return $localize`Chinese (Traditional)`;
      case 'Hind':
        return $localize`Hind`;
      default:
        return $localize``;
    }
  }

  ratePlanType(): string {
    if (!this.property?.ratePlan) {
      return;
    }
    if (
      this.property?.ratePlan.nonRefundable.setNonRefundable &&
      this.property?.ratePlan.refundable.fullyRefundable
    ) {
      return 'both';
    }
    if (this.property?.ratePlan.nonRefundable.setNonRefundable) {
      return $localize`:This property does not allow cancellations after booking. In case of no-shows the full amount will be charged@@nonRefundable: This property does not allow cancellations after booking. In case of no-shows the full amount will be charged`;
    }
    if (this.property?.ratePlan.refundable.fullyRefundable) {
      if (this.startDate) {
        let result = subtractDaysFromDate(
          this.startDate,
          this.property?.ratePlan.refundable.cancellationPolicy
        );
        return (
          $localize`:You can cancel this reservation free of charge before @@fullyRefundableReservationCheckIn: You can cancel this reservation free of charge before ` +
          result
        );
      } else if (
        this.property?.ratePlan.refundable.cancellationPolicy === 0 ||
        this.property?.ratePlan.refundable.cancellationPolicy === null
      ) {
        return $localize`:You can cancel this reservation free of charge until check-in day@@fullyRefundableReservationCheckInDaysZero: You can cancel this reservation free of charge until check-in day`;
      } else {
        return (
          $localize`:You can cancel this reservation free of charge @@fullyRefundableReservationWithoutCheckIn: You can cancel this reservation free of charge ` +
          `${this.property?.ratePlan.refundable.cancellationPolicy}` +
          $localize`:days before check-in date@@fullyRefundableReservationDays: days before check-in date`
        );
      }
    }
  }

  setHouseRules(allows): string {
    const houseRulesAllows = [];
    const houseRulesNotAllows = [];
    if (this.propertyPoliciesData?.petsAllowed) {
      houseRulesAllows.push($localize`:pets @@pets: pets`);
    } else {
      houseRulesNotAllows.push($localize`:pets @@pets: pets`);
    }
    if (this.propertyPoliciesData?.eventsAllowed) {
      houseRulesAllows.push($localize`:parties @@parties: parties`);
    } else {
      houseRulesNotAllows.push($localize`:parties @@parties: parties`);
    }
    if (this.propertyPoliciesData?.smokingAllowed) {
      houseRulesAllows.push($localize`:smoking @@smoking: smoking`);
    } else {
      houseRulesNotAllows.push($localize`:smoking @@smoking: smoking`);
    }

    if (allows) {
      return houseRulesAllows.length
        ? $localize`:The host allows @@hostAllows: The host allows` +
            ` ${houseRulesAllows.toString().split(',').join(', ')}`
        : '';
    }
    return houseRulesNotAllows.length
      ? $localize`:The host doesn’t allow @@hostDoesntAllow: The host doesn’t allow` +
          ` ${houseRulesNotAllows.toString().split(',').join(', ')}`
      : '';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
