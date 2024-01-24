import { NgModule } from '@angular/core';
import { BookingComponent } from './booking.component';
import { PropertyRoutingModule } from '../property/property-routing.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RoomReviewComponent } from './components/room-review/room-review.component';
import {PaymentComponent} from './components/payment/payment.component';
import { GuestsComponent } from './components/guests/guests.component';
import { GuestInputsComponent } from './components/guest-inputs/guest-inputs.component';
import { ReservationCompleteComponent } from './components/reservation-complete/reservation-complete.component';
import {NotificationService} from "./notification.service";

@NgModule({
  declarations: [BookingComponent, RoomReviewComponent, PaymentComponent, GuestsComponent, GuestInputsComponent, ReservationCompleteComponent],
  imports: [
    PropertyRoutingModule,
    CommonModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  providers: [NotificationService],
  exports: [],
})
export class BookingModule {}
