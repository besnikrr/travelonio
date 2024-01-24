import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PropertyTypesComponent } from './components/property-types/property-types.component';
import { SetPropertyNameComponent } from './components/set-property-name/set-property-name.component';
import { InsertRoomFormComponent } from './components/insert-room-form/insert-room-form.component';
import { BedTypeInfoComponent } from './components/bed-type-info/bed-type-info.component';
import { PropertyUserModule } from '../register-property-user/property-user.module';
import { SharedModule } from '../../../shared/shared.module';
import { SignUpComponent } from './sign-up.component';
import { PropertyKeywordComponent } from './components/property-keyword/property-keyword.component';
import { AmenitiesComponent } from './components/amenities/amenities.component';
import { BreakfastAndLanguageFormComponent } from './components/breakfast-and-language-form/breakfast-and-language-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PropertyPoliciesComponent } from './components/property-policies/property-policies.component';
import { DescribePropertyComponent } from './components/decribe-property/describe-property.component';
import { RoomDetailsComponent } from './components/room-details/room-details.component';
import { RoomsPricesComponent } from './components/rooms-prices/rooms-prices.component';
import { RatePlanComponent } from './components/rate-plan/rate-plan.component';
import { PropertyOverviewComponent } from './components/property-overview/property-overview.component';
import { PaymentOptionsComponent } from './components/payment-options/payment-options.component';
import { BankDetailsComponent } from './components/bank-details/bank-details.component';
import { SignUpCompletedFormComponent } from './components/sign-up-completed-form/sign-up-completed-form.component';
import { ReviewInfoComponent } from './components/review-info/review-info.component';
import { RoomFormComponent } from './components/room-form/room-form.component';
import { PropertySelectionComponent } from './components/property-selection/property-selection.component';
import { RouterModule } from '@angular/router';
import { EditPropertyComponent } from './components/edit-property/edit-property.component';
import { SignUpStepDescriptionComponent } from './components/sign-up-step-description/sign-up-step-description.component';
import { ListingOverviewComponent } from './components/listing-overview/listing-overview.component';
import { CustomDialogComponent } from './components/custom-dialog/custom-dialog.component';
import { PropertyLocationComponent } from './components/property-location/property-location.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { TagsFormComponent } from './components/tags-form/tags-form.component';
import { SignUpContentComponent } from './components/sign-up-content/sign-up-content.component';
import { SignUpRoutingModule } from './sign-up-routing.module';

@NgModule({
  declarations: [
    PropertyTypesComponent,
    SetPropertyNameComponent,
    InsertRoomFormComponent,
    BedTypeInfoComponent,
    SignUpComponent,
    PropertyKeywordComponent,
    AmenitiesComponent,
    BreakfastAndLanguageFormComponent,
    PropertyPoliciesComponent,
    DescribePropertyComponent,
    RoomDetailsComponent,
    RoomsPricesComponent,
    RatePlanComponent,
    PropertyOverviewComponent,
    PaymentOptionsComponent,
    BankDetailsComponent,
    SignUpCompletedFormComponent,
    ReviewInfoComponent,
    RoomFormComponent,
    PropertySelectionComponent,
    EditPropertyComponent,
    SignUpStepDescriptionComponent,
    ListingOverviewComponent,
    CustomDialogComponent,
    TagsFormComponent,
    SignUpContentComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    PropertyUserModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule,
    GoogleMapsModule,
    SignUpRoutingModule
  ],
  exports: [
    PropertyTypesComponent,
    SetPropertyNameComponent,
    InsertRoomFormComponent,
    BedTypeInfoComponent,
    PropertyKeywordComponent,
    AmenitiesComponent,
    BreakfastAndLanguageFormComponent,
    PropertyPoliciesComponent,
    DescribePropertyComponent,
    RoomDetailsComponent,
    RoomsPricesComponent,
    RatePlanComponent,
    PropertyOverviewComponent,
    PaymentOptionsComponent,
    BankDetailsComponent,
    SignUpCompletedFormComponent,
    ReviewInfoComponent
  ]
})
export class SignUpModule {
}
