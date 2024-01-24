import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  PaymentMethod,
  PaymentOptions,
  UpdatePaymentOptions,
} from '../../model/sign-up.data';
import { MatSelectChange } from '@angular/material/select';
import { PaymentMethods } from '../../model/paymentMethods.enum';
import { select, Store } from '@ngrx/store';
import {
  dirtyInputs,
  propertyId,
  propertyPaymentOptions,
} from '../../../../../ngrx/selectors/properties.selectors';
import { Subscription } from 'rxjs';
import { updatePropertyRequest } from '../../../../../ngrx/actions/properties.actions';

export enum PaymentTypeEnum {
  AT_BOOKING = 'AT_BOOKING',
  AT_PROPERTY = 'AT_PROPERTY',
}

@Component({
  selector: 'app-payment-options',
  templateUrl: './payment-options.component.html',
  styleUrls: ['./payment-options.component.scss'],
})
export class PaymentOptionsComponent implements OnInit {
  public options: PaymentOptions;
  public propertyId: string | undefined;

  public displayInfoCard = false;
  // TODO - to be uncommented when pay at booking is active
  public paymentOptions = [
    // { type: PaymentTypeEnum.AT_BOOKING, title: $localize`Pay when booking` },
    { type: PaymentTypeEnum.AT_PROPERTY, title: $localize`Pay at property` },
  ];
  public showIcons = false;
  public paymentMethods = PaymentMethods;
  public defined = PaymentMethods.getDefinedMethods();
  public definedMethods: PaymentMethod[] = [];
  public otherMethods: PaymentMethod[] = [];
  public newMethods: PaymentMethod[] = [];
  public subscription = new Subscription();
  public dirtyInputs = this.store.pipe(select(dirtyInputs));

  constructor(
    @Inject(PLATFORM_ID) private platformId: string,
    private store: Store
  ) {
    this.showIcons = isPlatformBrowser(platformId);

    this.subscription.add(
      this.store
        .pipe(select(propertyPaymentOptions))
        .subscribe((paymentOptions) => {
          if (paymentOptions) {
            this.options = paymentOptions;

            this.definedMethods = paymentOptions.payAtProperty.paymentMethods
              .filter((m) => this.defined.includes(m.name))
              .sort(
                (a, b) =>
                  this.defined.indexOf(a.name) - this.defined.indexOf(b.name)
              );

            this.otherMethods =
              paymentOptions.payAtProperty.paymentMethods.filter(
                (m) =>
                  !this.defined.includes(m.name) &&
                  m.name !== this.paymentMethods.Other
              );

            this.newMethods =
              paymentOptions.payAtProperty.paymentMethods.filter(
                (m) => m.name === this.paymentMethods.Other
              );
          }
        })
    );
    this.subscription.add(
      this.store.pipe(select(propertyId)).subscribe((id) => {
        this.propertyId = id;
      })
    );
  }

  ngOnInit(): void {
    // TODO - to be removed when pay at booking is active
    this.store.dispatch(
      updatePropertyRequest({
        propertyId: this.propertyId,
        data: {
          paymentOptions: {
            payWhenBooking: { selected: false },
            payAtProperty: { selected: true },
          },
        },
      })
    );
  }

  selectPaymentOption(event: MatSelectChange): void {
    if (event.value === PaymentTypeEnum.AT_BOOKING) {
      this.store.dispatch(
        updatePropertyRequest({
          propertyId: this.propertyId,
          data: {
            paymentOptions: {
              payWhenBooking: { selected: true },
              payAtProperty: { selected: false },
            },
          },
        })
      );
    } else {
      this.store.dispatch(
        updatePropertyRequest({
          propertyId: this.propertyId,
          data: {
            paymentOptions: {
              payWhenBooking: { selected: false },
              payAtProperty: { selected: true },
            },
          },
        })
      );
    }
  }

  update(event: UpdatePaymentOptions): void {
    this.store.dispatch(
      updatePropertyRequest({
        propertyId: this.propertyId,
        data: { paymentOptions: event },
      })
    );
  }

  updatePaymentMethod(
    method: PaymentMethod,
    selected?: boolean,
    value?: string
  ): void {
    this.store.dispatch(
      updatePropertyRequest({
        propertyId: this.propertyId,
        data: {
          paymentOptions: {
            payAtProperty: { paymentMethods: { ...method, selected, value } },
          },
        },
      })
    );
  }
}
