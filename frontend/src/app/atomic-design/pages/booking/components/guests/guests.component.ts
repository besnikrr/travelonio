import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getCurrentRouteState } from '../../../../../ngrx/reducers';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-guests',
  templateUrl: './guests.component.html',
  styleUrls: ['./guests.component.scss'],
})
export class GuestsComponent implements OnInit, OnDestroy {
  gender = [
    { title: $localize`:Male @@male: Male`, value: 1 },
    { title: $localize`:Female @@female: Female`, value: 2 },
  ];
  adults: undefined | number[];
  children: undefined | number[];
  infants: undefined | number[];
  private subscription = new Subscription();

  constructor(private store: Store) {
    this.subscription.add(
      this.store.pipe(select(getCurrentRouteState)).subscribe((routes) => {
        // @ts-ignore
        const queries = routes.state.queryParams;
        this.adults = this.fillArray(+queries.adults);
        this.children = this.fillArray(+queries.children);
        this.infants = this.fillArray(+queries.infants);
      })
    );
  }

  ngOnInit(): void {}

  fillArray(value: number): number[] | undefined {
    if (isNaN(value)) {
      return undefined;
    }
    return Array(value)
      .fill(value)
      .map((x, i) => i);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
