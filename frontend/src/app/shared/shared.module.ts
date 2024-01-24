import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SingleLineFieldComponent } from '../atomic-design/molecules/single-line-field/single-line-field.component';
import { MainTemplateComponent } from '../atomic-design/molecules/main-template/main-template.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RezeMaterialModule } from '../material/material.module';
import { FileDropDirective } from './fileDrop.directive';
import { UploadImageComponent } from '../atomic-design/molecules/upload-image/upload-image.component';
import { HomePageHeaderComponent } from '../home-page-header/home-page-header.component';
import { RouterModule } from '@angular/router';
import { QuantityComponent } from '../atomic-design/molecules/quantity/quantity.component';
import { ImageRendererComponent } from '../atomic-design/molecules/image-renderer/image-renderer.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { FooterComponent } from '../footer/footer.component';
import { CheckInOutComponent } from '../check-in-out/check-in-out.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { GuestsFilterComponent } from '../atomic-design/molecules/guests-filter/guests-filter.component';
import { PropertyLocationComponent } from '../atomic-design/pages/sign-up/components/property-location/property-location.component';
import { SearchLocationFieldComponent } from '../home-page/component/search-location-field/search-location-field.component';
import { CustomizedGoogleMapComponent } from '../atomic-design/atoms/customized-google-map/customized-google-map.component';
import { UserBillCardComponent } from '../atomic-design/molecules/user-bill-card/user-bill-card.component';
import { TwoColumnsLayoutComponent } from '../atomic-design/molecules/two-columns-layout/two-columns-layout.component';
import { PropertyInfoComponent } from '../atomic-design/molecules/property-info/property-info.component';
import { PriceRangeComponent } from '../atomic-design/molecules/price-range/price-range.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

@NgModule({
  declarations: [
    MainTemplateComponent,
    SingleLineFieldComponent,
    FileDropDirective,
    HomePageHeaderComponent,
    UploadImageComponent,
    QuantityComponent,
    ImageRendererComponent,
    FooterComponent,
    CheckInOutComponent,
    GuestsFilterComponent,
    PriceRangeComponent,
    PropertyLocationComponent,
    SearchLocationFieldComponent,
    UserBillCardComponent,
    TwoColumnsLayoutComponent,
    CustomizedGoogleMapComponent,
    PropertyInfoComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RezeMaterialModule,
    RouterModule,
    ReactiveFormsModule,
    OverlayModule,
    GoogleMapsModule,
    NgxSliderModule,
  ],
  exports: [
    SingleLineFieldComponent,
    MainTemplateComponent,
    RezeMaterialModule,
    FileDropDirective,
    UploadImageComponent,
    HomePageHeaderComponent,
    QuantityComponent,
    ImageRendererComponent,
    FooterComponent,
    CheckInOutComponent,
    GoogleMapsModule,
    GuestsFilterComponent,
    PriceRangeComponent,
    PropertyLocationComponent,
    SearchLocationFieldComponent,
    UserBillCardComponent,
    TwoColumnsLayoutComponent,
    CustomizedGoogleMapComponent,
    PropertyInfoComponent,
  ],
})
export class SharedModule {}
