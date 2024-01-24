import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  PLATFORM_ID,
} from '@angular/core';
import { RatePlan, UpdateRatePlan } from '../../model/sign-up.data';
import { Validators } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { select, Store } from '@ngrx/store';
import {
  dirtyInputs,
  propertyId,
  propertyRatePlan,
  propertyDiscountForTheFirstFiveGuests,
} from '../../../../../ngrx/selectors/properties.selectors';
import { combineLatest, Subscription } from 'rxjs';
import { firstRoom } from '../../../../../ngrx/selectors/rooms.selectors';
import { updatePropertyRequest } from '../../../../../ngrx/actions/properties.actions';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-rate-plan',
  templateUrl: './rate-plan.component.html',
  styleUrls: ['./rate-plan.component.scss'],
})
export class RatePlanComponent implements OnDestroy {
  public ratePlan: RatePlan;
  public initialRoomPrice: number;
  public roomDiscount: number;
  public propertyId: string | undefined;
  public showGroupPlan = false;
  public validators = Validators;
  public showIcons = false;
  public priceAfterDiscount: number;
  public priceAfterNonRefundableDiscount: number;
  public priceWithGroupDiscount: number;
  public priceWithWeeklyPlanDiscount: number;
  public subscription = new Subscription();
  public dirtyInputs = this.store.pipe(select(dirtyInputs));

  constructor(
    @Inject(PLATFORM_ID) private platformId: string,
    private store: Store,
    cd: ChangeDetectorRef
  ) {
    this.showIcons = isPlatformBrowser(platformId);
    this.subscription.add(
      this.store.pipe(select(propertyId)).subscribe((id) => {
        this.propertyId = id;
      })
    );
    this.subscription.add(
      combineLatest([
        this.store.pipe(select(firstRoom)),
        this.store.pipe(select(propertyRatePlan)),
        this.store.pipe(select(propertyDiscountForTheFirstFiveGuests)),
      ])
        .pipe(debounceTime(0))
        .subscribe(([room, plan, discountFiveGuests]) => {
          if (room) {
            this.initialRoomPrice = room.price;
            this.roomDiscount = room.discountPlan.hasDiscount
              ? room.discountPlan.discountPercentage
              : 0;
            this.priceAfterDiscount = this.roundNumber(
              room.price - (room.price * this.roomDiscount) / 100
            );
            if (discountFiveGuests) {
              this.priceAfterDiscount = this.roundNumber(
                this.priceAfterDiscount - (this.priceAfterDiscount * 20) / 100
              );
            }
          }
          if (plan) {
            this.ratePlan = plan;

            this.priceAfterNonRefundableDiscount = this.roundNumber(
              this.priceAfterDiscount -
                (this.priceAfterDiscount * plan.nonRefundable.discount) / 100
            );

            this.priceWithGroupDiscount = this.roundNumber(
              this.priceAfterNonRefundableDiscount -
                (this.priceAfterNonRefundableDiscount *
                  plan.pricePerGroup.discountForOne) /
                  100
            );

            this.priceWithWeeklyPlanDiscount = this.roundNumber(
              this.priceWithGroupDiscount -
                this.priceWithGroupDiscount * (plan.weeklyPlan.discount / 100)
            );

            cd.markForCheck();
          }
        })
    );
  }

  roundNumber(value): number {
    return value.toFixed(2);
  }

  updateRatePlan(event: UpdateRatePlan): void {
    if (event.refundable) {
      event = {
        refundable: {
          fullyRefundable: true,
        },
        nonRefundable: {
          setNonRefundable: false,
          discount: 0,
        },
      };
    }

    if (event.nonRefundable) {
      event = {
        refundable: {
          fullyRefundable: false,
        },
        nonRefundable: {
          setNonRefundable: true,
          discount: 0,
        },
      };
    }

    this.store.dispatch(
      updatePropertyRequest({
        propertyId: this.propertyId,
        data: { ratePlan: event },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
