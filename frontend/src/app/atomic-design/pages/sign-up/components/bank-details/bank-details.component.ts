import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { BankDetails, UpdateBankDetails } from '../../model/sign-up.data';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
  dirtyInputs,
  propertyBankDetails,
  propertyId,
} from '../../../../../ngrx/selectors/properties.selectors';
import { updatePropertyRequest } from '../../../../../ngrx/actions/properties.actions';

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.scss'],
})
export class BankDetailsComponent implements OnInit {
  public bankDetails: BankDetails;
  public validators = Validators;
  public propertyId: string | undefined;
  public subscription = new Subscription();
  public dirtyInputs = this.store.pipe(select(dirtyInputs));

  constructor(private store: Store) {
    this.subscription.add(
      this.store.pipe(select(propertyBankDetails)).subscribe((details) => {
        if (details) {
          this.bankDetails = details;
        }
      })
    );

    this.subscription.add(
      this.store.pipe(select(propertyId)).subscribe((id) => {
        this.propertyId = id;
      })
    );
  }

  ngOnInit(): void {}

  updateBankDetails(event: UpdateBankDetails): void {
    this.store.dispatch(
      updatePropertyRequest({
        propertyId: this.propertyId,
        data: {
          bankDetails: {
            swiftCode: event.swiftCode,
            bankName: event.bankName,
            accountNumber: event.accountNumber,
            accountOwner: event.accountOwner,
          },
        },
      })
    );
  }
}
