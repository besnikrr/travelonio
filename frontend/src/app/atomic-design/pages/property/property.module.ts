import { NgModule } from '@angular/core';
import { PropertyComponent } from './property.component';
import { SharedModule } from '../../../shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { PropertyOverviewComponent } from './components/property-overview/property-overview.component';
import { PropertyAvailabilityComponent } from './components/property-availability/property-availability.component';
import { PropertyAmenitiesComponent } from './components/property-amenities/property-amenities.component';
import { PropertyPoliciesComponent } from './components/property-policies/property-policies.component';
import { PropertyReviewsComponent } from './components/property-reviews/property-reviews.component';
import { PropertyMapComponent } from './components/property-map/property-map.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { PropertyRoutingModule } from './property-routing.module';
import { PropertyDetailsComponent } from './components/property-details/property-details.component';

@NgModule({
  declarations: [
    PropertyComponent,
    PropertyOverviewComponent,
    PropertyAvailabilityComponent,
    PropertyAmenitiesComponent,
    PropertyPoliciesComponent,
    PropertyReviewsComponent,
    PropertyMapComponent,
    PropertyComponent,
    PropertyDetailsComponent,
  ],
  imports: [
    SharedModule,
    MatTabsModule,
    GoogleMapsModule,
    CommonModule,
    PropertyRoutingModule,
  ],
  exports: [PropertyPoliciesComponent, PropertyOverviewComponent],
})
export class PropertyModule {}
