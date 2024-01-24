import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { RoomReviewComponent } from '../booking/components/room-review/room-review.component';
import { PropertyDetailsComponent } from './components/property-details/property-details.component';
import { BookingComponent } from '../booking/booking.component';
import { PaymentComponent } from '../booking/components/payment/payment.component';
import { GuestsComponent } from '../booking/components/guests/guests.component';
import { BookingGuardService } from '../../../guards/booking-guard.service';
import { ReservationCompleteComponent } from '../booking/components/reservation-complete/reservation-complete.component';
import { AuthenticationGuard } from '../../../guards/authentication-guard.service';
import { ReservationCompleteGuardService } from '../../../guards/reservation-complete-guard.service';

const routes: Routes = [
  {
    path: 'property/:propertyId',
    component: PropertyDetailsComponent,
  },
  {
    path: 'property',
    component: BookingComponent,
    children: [
      {
        path: ':propertyId/rooms/:roomId/review',
        component: RoomReviewComponent,
        canActivate: [BookingGuardService],
      },
      {
        path: ':propertyId/rooms/:roomId/guests',
        component: GuestsComponent,
        canActivate: [BookingGuardService],
      },
      {
        path: ':propertyId/rooms/:roomId/payment',
        component: PaymentComponent,
        canActivate: [BookingGuardService],
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PropertyRoutingModule {}
