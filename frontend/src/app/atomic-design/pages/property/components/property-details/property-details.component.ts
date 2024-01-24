import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { Property } from '../../../../../ngrx/reducers/properties.reducers';
import { Room } from '../../../../../ngrx/reducers/rooms.reducers';
import { combineLatest, Subscription } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { isPlatformBrowser } from '@angular/common';
import { publicPropertySelector } from '../../../../../ngrx/selectors/properties.selectors';
import { getPublicPropertyRequest } from '../../../../../ngrx/actions/properties.actions';
import { getCurrentRouteState } from '../../../../../ngrx/reducers';
import { CheckRoomAvailabilityBody } from '../../../../../ngrx/reducers/booking.reducers';
import { BookingService } from '../../../../../ngrx/services/booking.service';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss'],
})
export class PropertyDetailsComponent implements OnInit, OnDestroy {
  public showIcons = false;
  public property: Property;
  public rooms: Room[];
  public roomQuantityForBooking:
    | {
        roomId: string;
        roomQuantity: number;
      }
    | undefined;

  public propertyId: string;
  private subscription = new Subscription();

  public baseUrl = environment.baseUrl;
  showModal: boolean = false;
  imageId: string;
  imgIndex: number;
  imageIds: string[];
  hidePreviousIcon: boolean = false;
  hideNextIcon: boolean = false;
  numRows;

  constructor(
    @Inject(PLATFORM_ID) private platformId: string,
    private route: ActivatedRoute,
    private store: Store,
    private bookingService: BookingService
  ) {
    this.showIcons = isPlatformBrowser(platformId);

    isPlatformBrowser(platformId);
    {
      this.subscription.add(
        combineLatest([
          this.store.pipe(select(publicPropertySelector)),
          this.store.pipe(select(getCurrentRouteState)),
        ]).subscribe(([property, routeState]) => {
          if (property) {
            this.property = property;
            this.imageIds = property.imageIds;
            let numRows = Math.ceil((this.imageIds.length - 4) / 11) + 6;
            this.numRows = numRows;
            // @ts-ignore
            const state = routeState.state;
            if (state.queryParams.allRooms === 'true') {
              this.rooms = this.property?.rooms;
            } else {
              this.rooms = [];
              const body = {
                roomIds: this.property?.rooms?.map((r) => r.id) as string[],
                startDate: state.queryParams.startDate,
                endDate: state.queryParams.endDate,
                adults: isNaN(+state.queryParams.adults)
                  ? 0
                  : +state.queryParams.adults,
                children: isNaN(+state.queryParams.children)
                  ? 0
                  : +state.queryParams.children,
                infants: isNaN(+state.queryParams.infants)
                  ? 0
                  : +state.queryParams.infants,
                rooms: isNaN(+state.queryParams.rooms)
                  ? 0
                  : +state.queryParams.rooms,
              } as CheckRoomAvailabilityBody;
              if (body.roomIds && body.roomIds.length > 0) {
                this.bookingService
                  .checkRoomAvailability(state.params.propertyId, body)
                  .subscribe((res) => {
                    if (res.rooms && res.rooms.length > 0) {
                      this.rooms = res.rooms;
                    }
                  });
              }
            }
          }
        })
      );
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.propertyId = params.propertyId;

      this.store.dispatch(
        getPublicPropertyRequest({ propertyId: this.propertyId })
      );
    });
  }

  onImageClick(imageID, index): void {
    this.imageId = imageID;
    this.imgIndex = index;
    this.showModal = true;

    if (this.imageIds.length === 1) {
      this.hidePreviousIcon = true;
      this.hideNextIcon = true;
      return;
    }

    if (this.imageIds.length === 2 && index === 0) {
      this.hidePreviousIcon = true;
      this.hideNextIcon = false;
      return;
    }

    if (this.imageIds.length === 2 && index === 1) {
      this.hideNextIcon = true;
      this.hidePreviousIcon = false;
      return;
    }

    if (this.imageIds.length > 2) {
      if (index > 0 && index < this.imageIds.length - 1) {
        this.hidePreviousIcon = false;
        this.hideNextIcon = false;
        return;
      }
      if (index === 0) {
        this.hidePreviousIcon = true;
        this.hideNextIcon = false;
        return;
      }
      if (index === this.imageIds.length - 1) {
        this.hideNextIcon = true;
        this.hidePreviousIcon = false;
        return;
      }
    }
  }

  previous(): void {
    if (this.imgIndex > 0) {
      this.imgIndex--;
      this.imageId = this.imageIds.find(
        (item, index) => index === this.imgIndex
      );
      if (this.imageIds[0] === this.imageId) {
        this.hidePreviousIcon = true;
      }
      if (this.imageIds.length > 1) {
        this.hideNextIcon = false;
      }
    }
  }

  next(): void {
    if (this.imgIndex < this.imageIds.length - 1) {
      this.imgIndex++;
      this.imageId = this.imageIds.find(
        (item, index) => index === this.imgIndex
      );
      if (this.imageIds[this.imageIds.length - 1] === this.imageId) {
        this.hideNextIcon = true;
      }
      if (this.imageIds.length > 1) {
        this.hidePreviousIcon = false;
      }
    }
  }

  onClose(): void {
    this.showModal = false;
    this.hideNextIcon = false;
    this.hidePreviousIcon = false;
  }

  scrollTo(element: any): void {
    (document.getElementById(element) as HTMLElement).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  setRoomQuantityForBooking(
    $event:
      | {
          roomId: string;
          roomQuantity: number;
        }
      | undefined
  ): void {
    this.roomQuantityForBooking = $event;
  }
}
