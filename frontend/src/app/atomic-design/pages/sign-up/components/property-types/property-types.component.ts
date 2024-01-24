import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { PropertyTypes } from '../../model/property-types';
import { select, Store } from '@ngrx/store';
import {
  dirtyInputs,
  propertyId,
  propertyType,
} from '../../../../../ngrx/selectors/properties.selectors';
import { Subscription } from 'rxjs';
import { updatePropertyRequest } from '../../../../../ngrx/actions/properties.actions';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-property-types',
  templateUrl: './property-types.component.html',
  styleUrls: ['./property-types.component.scss'],
})
export class PropertyTypesComponent implements OnInit {
  public selectedPropertyType: PropertyTypes;
  public PropertyTypes = PropertyTypes;
  public propertyIdForDisplayingInfo: number | undefined = undefined;
  public propertyId: string | undefined;

  public subscription = new Subscription();
  public showIcons = false;
  public dirtyInputs = this.store.pipe(select(dirtyInputs));

  constructor(
    private store: Store,
    @Inject(PLATFORM_ID) private platformId: string
  ) {
    this.showIcons = isPlatformBrowser(platformId);
    this.subscription.add(
      this.store.pipe(select(propertyType)).subscribe((s: PropertyTypes) => {
        if (s) {
          this.selectedPropertyType = s;
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

  setPropertyType(
    event: Event,
    property: { type: PropertyTypes; active: boolean }
  ): void {
    if (!property.active) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (this.propertyId) {
      this.store.dispatch(
        updatePropertyRequest({
          propertyId: this.propertyId,
          data: {
            propertyType: property.type,
          },
        })
      );
    }
  }

  showTypeInfo(type: PropertyTypes): void {
    if (this.propertyIdForDisplayingInfo === type) {
      this.propertyIdForDisplayingInfo = undefined;
    } else {
      this.propertyIdForDisplayingInfo = type;
    }
  }
}
