import { Component, OnInit } from '@angular/core';
import { PropertySummaryInfo } from '../../../../../shared/interfaces/property';
import { select, Store } from '@ngrx/store';
import { getReservedBookData } from '../../../../../ngrx/selectors/booking.selectors';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { nightsCalculator } from '../../../../../shared/utils';
import { getCurrentRouteState } from '../../../../../ngrx/reducers';

@Component({
  selector: 'app-reservation-complete',
  templateUrl: './reservation-complete.component.html',
  styleUrls: ['./reservation-complete.component.scss'],
})
export class ReservationCompleteComponent implements OnInit {
  public propertyInfo: PropertySummaryInfo;
  public overallInfo;
  private subscription = new Subscription();
  public roomCount: number;
  constructor(private store: Store, private router: Router) {
    this.subscription.add(
      this.store.pipe(select(getCurrentRouteState)).subscribe((routes) => {
        // @ts-ignore
        const url = routes.state;
        this.roomCount = url.queryParams.rooms;
      })
    );

    this.subscription.add(
      this.store.pipe(select(getReservedBookData)).subscribe((data) => {
        console.log('data: ', data);
        this.overallInfo = data;
        let totalPrice;
        if (data) {
          const startDate =
            new Date(data.startDate).getDate() +
            '-' +
            (new Date(data.startDate).getMonth() + 1) +
            '-' +
            new Date(data.startDate).getFullYear();
          const endtDate =
            new Date(data.endDate).getDate() +
            '-' +
            (new Date(data.endDate).getMonth() + 1) +
            '-' +
            new Date(data.endDate).getFullYear();
          const nights = nightsCalculator(startDate, endtDate);
          totalPrice = data.propertyFrozenData.room.price * nights;
          this.propertyInfo = {
            propertyId: data.propertyId,
            price: totalPrice,
            propertyName: data.propertyFrozenData.property.name,
            primaryImageId: data.propertyFrozenData.property.imageIds[0],
            propertyType: data.propertyFrozenData.property.propertyType,
            location: data.propertyFrozenData.property.location,
            nights: nights,
          };
        }
      })
    );
  }

  ngOnInit(): void {}

  public goHome(): void {
    this.router.navigate(['/home']);
  }
}
