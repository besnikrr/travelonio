import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageComponent } from './home-page/home-page.component';
import { CountryDisplayCardComponent } from './atomic-design/molecules/country-display-card/country-display-card.component';
import {
  CommonModule,
  LocationStrategy,
  PathLocationStrategy,
} from '@angular/common';
import { InfoBoxComponent } from './atomic-design/atoms/info-box/info-box.component';
// tslint:disable-next-line:max-line-length
import { DestinationImageContainerComponent } from './atomic-design/atoms/destination-image-container/destination-image-container.component';
import { PlacesDisplayCardComponent } from './atomic-design/molecules/places-display-card/places-display-card.component';
import { SignUpModule } from './atomic-design/pages/sign-up/sign-up.module';

import { initialState, rootReducer } from './ngrx/reducers';
import { StoreModule } from '@ngrx/store';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { PropertyUserEffects } from './ngrx/effects/property-user.effects';
import { EffectsModule } from '@ngrx/effects';
import { PropertyUsersService } from './ngrx/services/property-user-service';
import { PropertyUserModule } from './atomic-design/pages/register-property-user/property-user.module';
import { SharedModule } from './shared/shared.module';
import { SnackBarService } from './ngrx/services/snackbar.service';
import { PropertiesService } from './ngrx/services/properties.service';
import { PropertiesEffects } from './ngrx/effects/properties.effects';
import { AttachmentsService } from './ngrx/services/attachments.service';
import { RoomService } from './ngrx/services/rooms.service';
import { RoomsEffects } from './ngrx/effects/rooms.effects';
import { DescribeTripOptionsComponent } from './home-page/component/descripe-trip-options/describe-trip-options.component';
import { BedsEffects } from './ngrx/effects/beds.effects';
import { BedService } from './ngrx/services/beds.service';
import { TestimonialPictureComponent } from './home-page/component/testimonial-picture/testimonial-picture.component';
import { HttpService } from './http.service';
import { ReactiveFormsModule } from '@angular/forms';
import { PropertyModule } from './atomic-design/pages/property/property.module';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { CustomSerializer } from './shared/CustomSerializer';
import { PropertyListComponent } from './atomic-design/pages/property-list/property-list.component';
import { WelcomeDialogComponent } from './atomic-design/molecules/welcome-dialog/welcome-dialog.component';
import { SettingsEffects } from './ngrx/effects/settings.effects';
import { SettingsServices } from './ngrx/services/settings.services';
import { BookingModule } from './atomic-design/pages/booking/booking.module';
import { AboutUsComponent } from './atomic-design/organisms/about-us/about-us.component';
import { BookingEffects } from './ngrx/effects/booking.effects';
import { BookingService } from './ngrx/services/booking.service';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { CarouselItemComponent } from './home-page/component/carousel-item/carousel-item.component';
import { RouletteComponent } from './home-page/component/roulette/roulette.component';
import { FaqComponent } from './atomic-design/organisms/faq/faq.component';
import { HowItWorksComponent } from './atomic-design/organisms/how-it-works/how-it-works.component';
import { CancelOptionsComponent } from './atomic-design/organisms/cancel-options/cancel-options.component';
import { SpinnerDialogComponent } from './home-page/component/spinner-dialog/spinner-dialog.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ContactUsComponent } from './atomic-design/organisms/contact-us/contact-us.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    CountryDisplayCardComponent,
    InfoBoxComponent,
    DestinationImageContainerComponent,
    PlacesDisplayCardComponent,
    DescribeTripOptionsComponent,
    TestimonialPictureComponent,
    PropertyListComponent,
    WelcomeDialogComponent,
    AboutUsComponent,
    CarouselItemComponent,
    RouletteComponent,
    FaqComponent,
    HowItWorksComponent,
    ContactUsComponent,
    CancelOptionsComponent,
    SpinnerDialogComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    SignUpModule,
    PropertyModule,
    PropertyUserModule,
    ReactiveFormsModule,
    SharedModule,
    BookingModule,
    StoreModule.forRoot(rootReducer, {
      initialState,
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
      },
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: true,
    }),
    EffectsModule.forRoot([
      PropertyUserEffects,
      PropertiesEffects,
      RoomsEffects,
      BedsEffects,
      SettingsEffects,
      BookingEffects,
    ]),
    IvyCarouselModule,
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer,
    }),
    NgxSliderModule,
  ],
  providers: [
    PropertyUsersService,
    PropertiesService,
    SnackBarService,
    AttachmentsService,
    RoomService,
    SettingsServices,
    BedService,
    HttpService,
    BookingService,
    { provide: LocationStrategy, useClass: PathLocationStrategy },
  ],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
