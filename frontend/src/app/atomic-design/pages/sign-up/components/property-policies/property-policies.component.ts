import { Component } from '@angular/core';
import {
  PropertyPoliciesData,
  UpdatePropertyPoliciesData,
} from '../../model/sign-up.data';
import { checkHours } from '../../model/check-hours';
import { MatSelectChange } from '@angular/material/select';
import { select, Store } from '@ngrx/store';
import {
  dirtyInputs,
  propertyId,
  propertyPoliciesData,
} from '../../../../../ngrx/selectors/properties.selectors';
import { Subscription } from 'rxjs';
import { updatePropertyRequest } from '../../../../../ngrx/actions/properties.actions';

@Component({
  selector: 'app-property-policies',
  templateUrl: './property-policies.component.html',
  styleUrls: ['./property-policies.component.scss'],
})
export class PropertyPoliciesComponent {
  public propertyPoliciesData: PropertyPoliciesData;
  public checkHours = checkHours;
  public propertyId: string | undefined;

  public subscription = new Subscription();
  public dirtyInputs = this.store.pipe(select(dirtyInputs));

  constructor(private store: Store) {
    this.subscription.add(
      this.store.pipe(select(propertyPoliciesData)).subscribe((p) => {
        if (p) {
          this.propertyPoliciesData = p;
        }
      })
    );
    this.subscription.add(
      this.store.pipe(select(propertyId)).subscribe((id) => {
        this.propertyId = id;
      })
    );
  }

  updateCheckInFrom(event: MatSelectChange): void {
    this.updatePropertyPolicies({
      checkIn: { from: event.value as string },
    });
  }

  updatePropertyPolicies(updatePolicies: UpdatePropertyPoliciesData): void {
    this.store.dispatch(
      updatePropertyRequest({
        propertyId: this.propertyId,
        data: { propertyPoliciesData: updatePolicies },
      })
    );
  }

  updateCheckInTo(event: MatSelectChange): void {
    this.updatePropertyPolicies({
      checkIn: { to: event.value as string },
    });
  }

  updateCheckOutFrom(event: MatSelectChange): void {
    this.updatePropertyPolicies({
      checkOut: { from: event.value as string },
    });
  }

  updateCheckOutTo(event: MatSelectChange): void {
    this.updatePropertyPolicies({
      checkOut: { to: event.value as string },
    });
  }
}
