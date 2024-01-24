import { Component, OnInit } from '@angular/core';
import { updatePropertyRequest } from '../../../../../ngrx/actions/properties.actions';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
  dirtyInputs,
  propertyId,
  propertyReviewInfo,
} from '../../../../../ngrx/selectors/properties.selectors';
import { ReviewInfoData } from '../../model/sign-up.data';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-review-info',
  templateUrl: './review-info.component.html',
  styleUrls: ['./review-info.component.scss'],
})
export class ReviewInfoComponent implements OnInit {
  public reviewInfo: ReviewInfoData;
  public propertyId: string | undefined;
  public validators = Validators;

  public subscription = new Subscription();
  public dirtyInputs = this.store.pipe(select(dirtyInputs));

  constructor(private store: Store) {
    this.subscription.add(
      this.store.pipe(select(propertyId)).subscribe((id) => {
        this.propertyId = id;
      })
    );

    this.subscription.add(
      this.store.pipe(select(propertyReviewInfo)).subscribe((id) => {
        this.reviewInfo = id;
      })
    );
  }

  ngOnInit(): void {
    this.updatePropertyInfo({ address: this.reviewInfo.propertyAddress });
  }

  updatePropertyInfo(event: {
    name?: string;
    address?: string;
    licenseNumber?: string;
    vatNumber?: string;
    businessRegistrationNumber?: string;
  }): void {
    this.store.dispatch(
      updatePropertyRequest({
        propertyId: this.propertyId,
        data: {
          businessInfo: {
            name: event.name,
            address: event.address,
            licenseNumber: event.licenseNumber,
            vatNumber: event.vatNumber,
            businessRegistrationNumber: event.businessRegistrationNumber,
          },
        },
      })
    );
  }
}
