import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { environment } from '../../../../environments/environment';
import { SearchedGuests } from '../../../shared/interfaces/guest';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { getCurrentRouteState } from '../../../ngrx/reducers';
import { confirmBookingRequest } from '../../../ngrx/actions/booking.actions';
import { NotificationService } from '../../pages/booking/notification.service';
import { SnackBarService } from '../../../ngrx/services/snackbar.service';
import { propertyUserSessionSelector } from '../../../ngrx/selectors/property-user.selectors';
import { PropertyUserSession } from '../../../ngrx/actions/action-models';
import { reviewDataSelector } from '../../../ngrx/selectors/booking.selectors';
import { Room } from '../../../ngrx/reducers/rooms.reducers';
import { Subscription } from 'rxjs';
import { nightsCalculator } from '../../../shared/utils';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-user-bill-card',
  templateUrl: './user-bill-card.component.html',
  styleUrls: ['./user-bill-card.component.scss'],
})
export class UserBillCardComponent implements OnInit, OnDestroy {
  @Input() selectedGuests: SearchedGuests;
  @Input() selectedEndDate: string;
  @Input() selectedStartDate: string;
  @Input() showRoomCountAndPrice = true;
  @Input() showContinueButton = true;
  @Input() showBookNowButton = false;
  @Input() roomQuantityForBooking:
    | {
        roomId: string;
        roomQuantity: number;
      }
    | undefined;
  @Input() buttonName = $localize`:Continue text@@continueText:Continue`;

  public baseUrl = environment.baseUrl;
  public areTermsAcceptedInPaymentPage = true;
  public currentUrlState;
  public session: PropertyUserSession | undefined;
  public room: Room;
  public nights: number;
  private subscription = new Subscription();
  roomCount: number;
  currentLanguage = 'AL';

  constructor(
    private route: Router,
    private store: Store,
    private notificationService: NotificationService,
    private snackBar: SnackBarService,
    private activatedRoute: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: string
  ) {
    this.subscription.add(
      this.store.pipe(select(getCurrentRouteState)).subscribe((routes) => {
        // @ts-ignore
        this.currentUrlState = routes.state;
        if (this.currentUrlState.queryParams.startDate) {
          this.nights = nightsCalculator(
            this.currentUrlState.queryParams.startDate,
            this.currentUrlState.queryParams.endDate
          );
          this.roomCount = this.currentUrlState.queryParams.rooms;
        }
      })
    );
    this.subscription.add(
      this.store
        .pipe(select(propertyUserSessionSelector))
        .subscribe((session) => {
          this.session = session;
        })
    );
    this.subscription.add(
      this.store.pipe(select(reviewDataSelector)).subscribe((booking) => {
        if (booking && booking.rooms.length > 0) {
          this.room = booking.rooms[0] as Room;
        }
      })
    );
    if (isPlatformBrowser(this.platformId)) {
      this.currentLanguage = location.href.includes('/al') ? 'AL' : 'EN';
    }
  }

  ngOnInit(): void {
    this.notificationService.termsAccepted$.subscribe((val) => {
      this.areTermsAcceptedInPaymentPage = val;
    });
  }

  navigateBack(): void {
    if (this.currentUrlState.url.includes('/payment')) {
      this.navigateToRoomsPage('guests');
    } else if (this.currentUrlState.url.includes('/guests')) {
      this.navigateToRoomsPage('review');
    } else if (this.currentUrlState.url.includes('/review')) {
      this.route.navigate(
        ['booking/property/' + this.currentUrlState.params.propertyId],
        {
          queryParamsHandling: 'merge',
        }
      );
    } else {
      this.route.navigate(['/apartments'], {
        queryParamsHandling: 'merge',
      });
    }
  }

  navigateForward(): void {
    if (this.currentUrlState.url.includes('/review')) {
      this.navigateToRoomsPage('guests');
    } else if (this.currentUrlState.url.includes('/guests')) {
      if (localStorage.getItem('guests') === null) {
        this.snackBar.openSnackBar(
          $localize`:guest info required@@guestsInfoIsRequired:Please insert at least one guest information!`
        );
      } else {
        this.navigateToRoomsPage('payment');
      }
    } else if (this.currentUrlState.url.includes('/payment')) {
      if (!this.areTermsAcceptedInPaymentPage) {
        this.snackBar.openSnackBar(
          $localize`:accept terms and conditions text@@acceptTermsAndConditionsText:Please accept terms and conditions!`
        );
      } else {
        if (this.session === undefined) {
          localStorage.setItem('redirectTo', this.route.url);
          this.route.navigate(['login']);
        } else {
          const storeParams = this.currentUrlState.params;
          this.store.dispatch(
            confirmBookingRequest({
              propertyId: storeParams.propertyId,
              roomId: storeParams.roomId,
              startDate: this.selectedStartDate,
              endDate: this.selectedEndDate,
              guestsInfo: localStorage.getItem('guests').toString() || '',
              guests: {
                adults: isNaN(+this.currentUrlState.queryParams.adults)
                  ? 0
                  : +this.currentUrlState.queryParams.adults,
                children: isNaN(+this.currentUrlState.queryParams.children)
                  ? 0
                  : +this.currentUrlState.queryParams.children,
                infants: isNaN(+this.currentUrlState.queryParams.infants)
                  ? 0
                  : +this.currentUrlState.queryParams.infants,
              },
              rooms: isNaN(+this.currentUrlState.queryParams.rooms)
                ? 0
                : +this.currentUrlState.queryParams.rooms,
              language: this.currentLanguage,
            })
          );
        }
      }
    }
  }

  navigateToRoomsPage(pageUrl: string): void {
    this.route.navigate(
      [
        'booking/property/' +
          this.currentUrlState.params.propertyId +
          '/rooms/' +
          this.currentUrlState.params.roomId +
          '/' +
          pageUrl,
      ],
      {
        queryParamsHandling: 'merge',
      }
    );
  }

  getButtonName(): string {
    if (
      this.session === undefined &&
      this.currentUrlState.url.includes('/payment')
    ) {
      return 'Login and confirm booking';
    } else {
      return this.buttonName;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  guestsChanged($event: SearchedGuests): void {
    this.route.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        adults: $event.adults,
        children: $event.children,
        infants: $event.infants,
        allRooms: false,
      },
      queryParamsHandling: 'merge',
    });
  }

  startDateChanged($event: string): void {
    if ($event !== 'Invalid date') {
      this.route.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: {
          startDate: $event,
          allRooms: false,
        },
        queryParamsHandling: 'merge',
      });
    }
  }

  endDateChanged($event: string): void {
    if ($event !== 'Invalid date') {
      this.route.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: {
          endDate: $event,
          allRooms: false,
        },
        queryParamsHandling: 'merge',
      });
    }
  }

  bookNowClicked(): void {
    if (this.roomQuantityForBooking !== undefined) {
      this.route.navigate(
        [
          'booking/property/' +
            this.currentUrlState.params.propertyId +
            '/rooms/' +
            this.roomQuantityForBooking.roomId +
            '/review',
        ],
        {
          queryParams: {
            rooms: this.roomQuantityForBooking
              ? this.roomQuantityForBooking.roomQuantity
              : 1,
          },
          queryParamsHandling: 'merge',
        }
      );
    } else {
      const availabilityField = document.getElementById('available-rooms');
      if (availabilityField) {
        availabilityField.focus();
        availabilityField.scrollIntoView();
      }
    }
  }
}
