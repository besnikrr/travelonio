import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { PropertySummaryInfo } from '../../../shared/interfaces/property';
import { SearchedGuests } from '../../../shared/interfaces/guest';
import { Keywords } from '../sign-up/model/keywords.enum';
import {
  PropertyOptions,
  SearchPropertyFilters,
  SorroundingsOptions,
  TripOptions,
} from '../../../home-page/hp-display-data/home-page-data';
import {
  LocationForUpdate,
  MunicipalityInfoData,
} from '../sign-up/model/locations';
import {
  CustomizedGoogleMapComponent,
  styles,
} from '../../atoms/customized-google-map/customized-google-map.component';

import { propertyListSelector } from '../../../ngrx/selectors/properties.selectors';
import {
  getLocationsList,
  getPropertyFiltersLocation,
} from '../../../ngrx/selectors/settings.selectors';
import {
  getCountriesAndCities,
  propertyFiltersChange,
  setHomePageSelectedLocationIds,
} from '../../../ngrx/actions/settings.actions';
import { isPlatformBrowser } from '@angular/common';
import { setPropertyList } from '../../../ngrx/actions/properties.actions';
import { Options } from '@angular-slider/ngx-slider';
import { MatSelectChange } from '@angular/material/select';
import { MatRadioChange } from '@angular/material/radio';
import { MatCheckboxChange } from '@angular/material/checkbox';

enum ReviewRank {
  ALL = -1,
  ONE_STAR = 1,
  TWO_STARS = 2,
  THREE_STARS = 3,
  FOUR_STARS = 4,
  FIVE_STARS = 5,
}
@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss'],
})
export class PropertyListComponent implements OnInit, OnDestroy {
  public propertyList: PropertySummaryInfo[];
  public location:
    | { countryId: string; cityId: string; villageId: string }
    | undefined;
  public startDate: string | undefined;
  public endDate: string | undefined;
  public guests: SearchedGuests | undefined;
  public Keywords = Keywords;
  public SearchPropertyFilters = SearchPropertyFilters;
  public listOfCountries$: Observable<MunicipalityInfoData[]>;
  public selectedProperty: string = null;
  public selectedSurroundings = [];
  public selectedTrips = [];
  public priceRange: { startPrice: number; endPrice: number };
  selectedMinPrice = null;
  selectedMaxPrice = null;
  priceSort = '';
  ratingSort = -1;
  bestValue = false;

  ReviewRankEnum = ReviewRank;

  center:
    | {
        lat: number;
        lng: number;
      }
    | undefined;
  options: google.maps.MapOptions = {
    styles,
    zoomControl: true,
    mapTypeControl: true,
    scaleControl: true,
    streetViewControl: true,
    rotateControl: true,
    fullscreenControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_CENTER,
    },
    streetViewControlOptions: {
      position: google.maps.ControlPosition.RIGHT_CENTER,
    },
  };

  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
    icon: '../../../../../../assets/map/green-label-map.svg',
  };
  markerPosition = [];
  zoom = 14;

  private subscription = new Subscription();

  public selectedPropertyFiltersFromStore: string;
  // public selectedProperty = SearchPropertyFilters.AllProperties;
  public showIcons = false;
  optionsSlider: Options = {};

  isFilterSidebarOpen: boolean = false;
  isSortSidebarOpen: boolean = false;
  isMapSidebarOpen: boolean = false;
  tripOptions = TripOptions;
  sorroundingsOptions = SorroundingsOptions;
  propertyOptions = PropertyOptions;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: string,
    public dialog: MatDialog
  ) {
    this.showIcons = isPlatformBrowser(platformId);

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.location = {
        countryId: params['countryId'],
        cityId: params['cityId'],
        villageId: params['villageId'],
      };
      this.startDate = params['startDate'];
      this.endDate = params['endDate'];
      this.guests = {
        adults: +params['adults'] || 0,
        children: +params['children'] || 0,
        infants: +params['infants'] || 0,
      };
      this.selectedProperty = params['propertyType']
        ? params['propertyType']
        : 'All Properties';
      this.selectedSurroundings =
        typeof params['surroundings'] === 'string'
          ? [params['surroundings']]
          : params['surroundings'] || [];

      this.selectedTrips =
        typeof params['tripType'] === 'string'
          ? [params['tripType']]
          : params['tripType'] || [];

      this.selectedMinPrice = params['minPrice'];
      this.selectedMaxPrice = params['maxPrice'];

      this.priceSort = params['price'];
      this.ratingSort = +params['rating'];
      this.bestValue = params['bestValue'];

      this.subscription.add(
        this.store
          .pipe(select(getPropertyFiltersLocation))
          .subscribe((location) => {
            if (location) {
              this.selectedPropertyFiltersFromStore =
                location.locationDisplayName;
            }
          })
      );
    });
    this.listOfCountries$ = this.store.pipe(select(getLocationsList));

    this.subscription.add(
      this.store
        .pipe(select(propertyListSelector))
        .subscribe((data: PropertySummaryInfo[]) => {
          this.propertyList = data;
          this.priceRange = this.propertyList?.reduce(
            (acc, curr) => {
              if (curr.price < acc.startPrice) {
                acc.startPrice = curr.price;
              }
              if (curr.price > acc.endPrice) {
                acc.endPrice = curr.price;
              }
              return acc;
            },
            { startPrice: Infinity, endPrice: -Infinity }
          );

          if (
            this.priceRange?.startPrice === Infinity ||
            this.priceRange?.endPrice === -Infinity
          ) {
            this.priceRange = undefined;
          }

          this.optionsSlider = {
            floor: this.priceRange?.startPrice,
            ceil: this.priceRange?.endPrice,
            translate: (value: number): string => {
              return '€' + value;
            },
          };

          setTimeout(() => {
            if (data) {
              this.markerPosition = [];
              data.forEach((d) => {
                if (d.location && d.location.latitude) {
                  this.markerPosition.push({
                    lat: d.location.latitude,
                    lng: d.location.longitude,
                    label: {
                      className: 'custom-marker-class',
                      text: '€' + d.price,
                    },
                    propertyId: d.propertyId,
                  });
                  this.center = {
                    lat: +d.location.latitude,
                    lng: +d.location.longitude,
                  };
                }
              });
            }
          });
        })
    );
  }

  ngOnInit(): void {
    this.optionsSlider = {
      floor: 0,
      ceil: 100,
      translate: (value: number): string => {
        return '€' + value;
      },
    };
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(setPropertyList({ properties: [] }));
  }

  selectPropertyTypes(event: MatSelectChange): void {
    this.selectedProperty = event.value;
  }

  selectPropertyTypesRadio(event: MatRadioChange): void {
    this.selectedProperty = event.value;
  }

  selectSurroundings(event: MatSelectChange): void {
    this.selectedSurroundings = event.value;
  }

  selectSurroundingsCheckbox(
    event: MatCheckboxChange,
    surrounding: string
  ): void {
    const foundElement = this.selectedSurroundings.includes(surrounding);
    this.selectedSurroundings = foundElement
      ? this.selectedSurroundings.filter((s) => s !== surrounding)
      : [...this.selectedSurroundings, surrounding];
  }

  selectTrips(event: MatSelectChange): void {
    this.selectedTrips = event.value;
  }

  selectTripsCheckbox(event: MatCheckboxChange, trip: string): void {
    const foundElement = this.selectedTrips.includes(trip);
    this.selectedTrips = foundElement
      ? this.selectedTrips.filter((s) => s !== trip)
      : [...this.selectedTrips, trip];
  }

  setSortByPrice(event: MatRadioChange): void {
    this.priceSort = event.value;
  }

  setSortByRating(event: MatRadioChange): void {
    this.ratingSort = event.value;
  }

  addMarker(event: google.maps.MapMouseEvent): void {}

  public locationChange(value: string): void {
    this.store.dispatch(getCountriesAndCities({ queryParam: value }));
  }

  public locationSelected(location: LocationForUpdate): void {
    this.location = {
      countryId: location.places.countryId + '',
      cityId: location.places.cityId + '',
      villageId: location.places.villageId + '',
    };
    this.store.dispatch(propertyFiltersChange({ places: location.places }));
    this.store.dispatch(
      setHomePageSelectedLocationIds({
        placeIds: {
          countryId: location.places.countryId,
          cityId: location.places.cityId,
          villageId: location.places.villageId,
        },
      })
    );
  }

  startDateChange(event): void {
    this.startDate = event;
  }

  endDateChange(event): void {
    this.endDate = event;
  }

  guestChanged(event): void {
    this.guests = event;
  }

  priceRangeChanged(event): void {
    this.selectedMinPrice = event.selectedMinPrice;
    this.selectedMaxPrice = event.selectedMaxPrice;
  }

  priceRangeChangedOnSlider(event) {
    this.selectedMinPrice = event.value;
    this.selectedMaxPrice = event.highValue;
  }

  public removeEmptyKeysFromObject(obj): any {
    for (const propName in obj) {
      if (
        obj[propName] === null ||
        obj[propName] === {} ||
        obj[propName] === ''
      ) {
        delete obj[propName];
      }
    }
    return obj;
  }

  searchClick(): void {
    const params = {
      countryId: this.location.countryId || '',
      cityId: this.location.cityId || '',
      villageId: this.location.villageId || '',
      startDate: this.startDate !== 'Invalid date' ? this.startDate : '',
      endDate: this.endDate !== 'Invalid date' ? this.endDate : '',
      adults: this.guests.adults || 0,
      children: this.guests.children || 0,
      infants: this.guests.infants || 0,
      propertyType:
        this.selectedProperty === 'All Properties' ? '' : this.selectedProperty,
      surroundings: this.selectedSurroundings,
      tripType: this.selectedTrips,
      minPrice: this.selectedMinPrice,
      maxPrice: this.selectedMaxPrice,
      price: this.priceSort ? this.priceSort : null,
      rating: this.ratingSort ? this.ratingSort : null,
      bestValue: this.bestValue,
    };
    const filteredQueryParams = Object.keys(params)
      .filter((k) => params[k] !== '')
      .reduce((a, k) => ({ ...a, [k]: params[k] }), {});
    this.router.navigate(['apartments'], { queryParams: filteredQueryParams });
  }

  public openMap(): void {
    this.dialog.open(CustomizedGoogleMapComponent, {
      data: this.markerPosition,
      panelClass: 'fullscreen-dialog',
    });
  }

  pinClicked(propertyId: string): void {
    this.router.navigate(['booking', 'property', propertyId], {
      queryParamsHandling: 'preserve',
    });
  }

  toggleFilterSidebar() {
    this.isFilterSidebarOpen = !this.isFilterSidebarOpen;
  }

  toggleSortSidebar() {
    this.isSortSidebarOpen = !this.isSortSidebarOpen;
  }

  toggleMapSidebar() {
    this.isMapSidebarOpen = !this.isMapSidebarOpen;
  }
}
