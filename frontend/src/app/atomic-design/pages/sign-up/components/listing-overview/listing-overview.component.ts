import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { Location } from '../../model/locations';
import { changeStepperValue, signUpStepsCompleted } from '../../../../../ngrx/actions/property-user.actions';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
  areAllStepsCompleted,
  propertyId,
  propertyLocation,
  propertyPrimaryImage,
  propertyReadyForBooking
} from '../../../../../ngrx/selectors/properties.selectors';
import { roomsSelector } from '../../../../../ngrx/selectors/rooms.selectors';
import { Room } from '../../../../../ngrx/reducers/rooms.reducers';
import { Router } from '@angular/router';
import {updatePropertyRequest} from "../../../../../ngrx/actions/properties.actions";

@Component({
  selector: 'app-listing-overview',
  templateUrl: './listing-overview.component.html',
  styleUrls: ['./listing-overview.component.scss']
})
export class ListingOverviewComponent implements OnChanges {
  public numberOfRooms: number;
  public startBookingDate: string;
  public image: string;
  public propertyId: string;
  public readyForBooking: boolean;
  public location: Location;

  public startDate: string;
  private subscription = new Subscription();

  constructor(private store: Store, private router: Router) {
    this.subscription.add(
      store.pipe(select(propertyId)).subscribe((id) => {
        if (id) {
          this.propertyId = id;
        }
      })
    );
    this.subscription.add(
      store.pipe(select(propertyPrimaryImage)).subscribe((image) => {
        if (image) {
          this.image = image;
        }
      })
    );

    this.subscription.add(
      this.store.pipe(select(roomsSelector)).subscribe((rooms) => {
        this.numberOfRooms = 0;
        rooms?.forEach((item: Room) => {
          this.numberOfRooms += item.quantity;
        });
      })
    );

    this.subscription.add(
      this.store.pipe(select(propertyLocation)).subscribe((location) => {
        if (location) {
          this.location = location;
        }
      })
    );

    this.subscription.add(
      this.store.pipe(select(propertyReadyForBooking)).subscribe((data) => {
        if (data) {
          this.startBookingDate = data.startDate;
          this.readyForBooking = data.ready;
        }
      })
    );
    this.subscription.add(
      this.store.pipe(select(areAllStepsCompleted)).subscribe((data) => {
        if (!data) {
          this.store.dispatch(updatePropertyRequest({ propertyId: this.propertyId, data: { completed: true }}));
        }
      })
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.startBookingDate) {
      this.startDate = new Date(this.startBookingDate).toLocaleDateString(
        'en-US',
        {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }
      );
    }
  }

  backToRegistration(): void {
    this.store.dispatch(signUpStepsCompleted({ completed: false }));
    this.store.dispatch(changeStepperValue({ newValue: 0 }));
    this.router.navigate(['/sign-up']);
  }
}
