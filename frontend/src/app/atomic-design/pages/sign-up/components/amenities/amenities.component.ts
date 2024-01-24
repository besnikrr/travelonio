import { Component } from '@angular/core';
import {
  AmenitiesData,
  AmenitiesDataForUpdate,
  TagUpdate,
} from '../../model/sign-up.data';
import { Validators } from '@angular/forms';
import { PropertyTags } from '../../model/room-descriptions';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
  propertyAmenities,
  propertyAmenitiesDescription,
  propertyId,
  propertyTags,
} from '../../../../../ngrx/selectors/properties.selectors';
import { updatePropertyRequest } from '../../../../../ngrx/actions/properties.actions';
import { Amenities } from '../../model/amenities.enum';

@Component({
  selector: 'app-amenities',
  templateUrl: './amenities.component.html',
  styleUrls: ['./amenities.component.scss'],
})
export class AmenitiesComponent {
  public propertyId: string;
  public tags = [];
  public amenities: AmenitiesData[];
  public amenitiesDescription: string;

  public validators = Validators;
  propertyTags = PropertyTags;
  public subscription = new Subscription();

  public Amenities = Amenities;
  public whatElseOffered = $localize`:What else does your place have to offer@@whatElseOffered:What else does your place have to offer`;

  constructor(private store: Store) {
    this.subscription.add(
      this.store.pipe(select(propertyId)).subscribe((id) => {
        this.propertyId = id;
      })
    );

    this.subscription.add(
      this.store.pipe(select(propertyTags)).subscribe((tags) => {
        this.tags = tags;
      })
    );

    this.subscription.add(
      this.store.pipe(select(propertyAmenities)).subscribe((amenities) => {
        this.amenities = amenities;
      })
    );

    this.subscription.add(
      this.store
        .pipe(select(propertyAmenitiesDescription))
        .subscribe((amenitiesDesc) => {
          this.amenitiesDescription = amenitiesDesc;
        })
    );
  }

  update(
    amenityName: Amenities,
    update: { name: Amenities; selected: boolean; distance?: number }
  ): void {
    this.store.dispatch(
      updatePropertyRequest({
        propertyId: this.propertyId,
        data: {
          amenity: {
            name: amenityName,
            option: {
              name: update.name,
              selected: update.selected,
              distance: update.distance,
            },
          },
        },
      })
    );
  }

  selectAmenity(amenity: AmenitiesDataForUpdate): void {
    this.store.dispatch(
      updatePropertyRequest({
        propertyId: this.propertyId,
        data: {
          amenity,
        },
      })
    );
  }

  updateAmenitiesDescription($event: string): void {
    this.store.dispatch(
      updatePropertyRequest({
        propertyId: this.propertyId,
        data: {
          amenitiesDescription: $event,
        },
      })
    );
  }

  tagUpdated($event: TagUpdate): void {
    this.store.dispatch(
      updatePropertyRequest({
        propertyId: $event.propertyId,
        data: { addTag: $event.tagAdded, removeTag: $event.tagDeleted },
      })
    );
  }
}
