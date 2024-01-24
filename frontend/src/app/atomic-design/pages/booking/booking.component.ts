import { Component, OnDestroy } from '@angular/core';
import { SearchedGuests } from '../../../shared/interfaces/guest';
import { select, Store } from '@ngrx/store';
import { getCurrentRouteState } from '../../../ngrx/reducers';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnDestroy {
  startDate: string;
  endDate: string;
  guests: SearchedGuests;
  public billCardButtonName = $localize`:Continue text@@continueText:Continue`;
  private subscription = new Subscription();

  constructor(private store: Store) {
    this.subscription.add(
      this.store.pipe(select(getCurrentRouteState)).subscribe((routes) => {
        // @ts-ignore
        const queries = routes.state.queryParams;
        this.guests = {
          adults: isNaN(+queries.adults) ? 0 : +queries.adults,
          children: isNaN(+queries.children) ? 0 : +queries.children,
          infants: isNaN(+queries.infants) ? 0 : +queries.infants,
        };
        this.startDate = queries.startDate;
        this.endDate = queries.endDate;
        // @ts-ignore
        this.billCardButtonName = routes.state.url.includes('payment')
          ? $localize`:Confirm Booking text@@confirmBookingText:Confirm Booking`
          : $localize`:Continue text@@continueText:Continue`;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
