import { Component, Inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import {
  carouselImages,
  countryData,
  CountryData,
  SearchPropertyFilters,
  TestimonialData,
  testimonials,
  TripOptions,
} from './hp-display-data/home-page-data';
import { isPlatformBrowser } from '@angular/common';
import { SearchedGuests } from '../shared/interfaces/guest';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import {
  getLocationsList,
  getPropertyFiltersLocation,
} from '../ngrx/selectors/settings.selectors';
import {
  LocationForUpdate,
  MunicipalityInfoData,
} from '../atomic-design/pages/sign-up/model/locations';
import {
  getCountriesAndCities,
  propertyFiltersChange,
  setHomePageSelectedLocationIds,
} from '../ngrx/actions/settings.actions';

export interface FilterOptions {
  location: LocationForUpdate;
  startDate: string;
  endDate: string;
  guests: SearchedGuests;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss', './home-page-responsive.scss'],
})
export class HomePageComponent implements OnDestroy {
  public showIcons = false;
  public countryData: CountryData[] = countryData;
  public SearchPropertyFilters = SearchPropertyFilters;
  public selectedTripOption = 1;
  public TripOptions = TripOptions;
  public testimonials: TestimonialData[] = testimonials;
  public carouselImages = carouselImages;
  public filterObject: FilterOptions = {
    location: {},
    startDate: '',
    endDate: '',
    guests: {
      adults: 0,
      children: 0,
      infants: 0,
    },
  };
  private queryParams: any = {};
  private subscription = new Subscription();
  public filteredLocations: Observable<MunicipalityInfoData[]>;
  public selectedProperties = [SearchPropertyFilters.AllProperties];
  public selectedPropertyFiltersFromStore: string;
  public disableSearchButton = false;
  public isSearchLocationInvalid = false;
  public isCheckInOutInvalid = false;
  public isGuestInvalid = false;

  constructor(
    private router: Router,
    private store: Store,
    @Inject(PLATFORM_ID) private platformId: string
  ) {
    this.showIcons = isPlatformBrowser(platformId);
    this.filteredLocations = this.store.pipe(select(getLocationsList));
    this.subscription.add(
      this.store
        .pipe(select(getPropertyFiltersLocation))
        .subscribe((location) => {
          if (location) {
            this.queryParams.countryId = location.countryId;
            this.queryParams.cityId = location.cityId;
            this.queryParams.villageId = location.villageId;
            this.selectedPropertyFiltersFromStore =
              location.locationDisplayName;
          }
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  navigateToWorkInProgress(): void {
    this.router.navigate(['/work-in-progress']);
  }

  navigateToSignUp(): void {
    this.router.navigate(['/sign-up']);
  }

  selectTripOption(trip: number): void {
    console.log('trip: ', trip);
    this.selectedTripOption = trip;
  }

  public locationChange(value: string): void {
    this.store.dispatch(getCountriesAndCities({ queryParam: value }));
  }

  public filterChanged(value: string, searchType: string): void {
    if (searchType === 'startDate') {
      this.filterObject.startDate = value;
      this.queryParams[searchType] = value;
    }
    if (searchType === 'endDate') {
      this.filterObject.endDate = value;
      this.queryParams[searchType] = value;
    }
    this.disableSearchButton =
      (this.queryParams.countryId || this.queryParams.countryId === 0) &&
      this.queryParams.startDate !== 'Invalid date' &&
      this.queryParams.endDate !== 'Invalid date' &&
      (this.queryParams.adults ||
        this.queryParams.children ||
        this.queryParams.infants);
  }

  public guestsChanged(data: SearchedGuests): void {
    this.queryParams.adults = data.adults;
    this.queryParams.children = data.children;
    this.queryParams.infants = data.infants;

    this.disableSearchButton =
      (this.queryParams.countryId || this.queryParams.countryId === 0) &&
      this.queryParams.startDate &&
      this.queryParams.endDate &&
      (data.adults > 0 || data.children > 0 || data.infants > 0);
  }

  public onSearchClick(): void {
    if (!this.queryParams.hasOwnProperty('countryId')) {
      this.isSearchLocationInvalid = true;
    }
    if (
      !this.queryParams.hasOwnProperty('startDate') ||
      this.queryParams.startDate !== 'Invalid date' ||
      !this.queryParams.hasOwnProperty('endDate') ||
      this.queryParams.endDate !== 'Invalid date'
    ) {
      this.isCheckInOutInvalid = true;
    }
    if (
      (!this.queryParams.hasOwnProperty('adults') ||
        this.queryParams.adults === 0) &&
      (!this.queryParams.hasOwnProperty('children') ||
        this.queryParams.children === 0) &&
      (!this.queryParams.hasOwnProperty('infants') ||
        this.queryParams.infants === 0)
    ) {
      this.isGuestInvalid = true;
    } else if (this.disableSearchButton) {
      this.router.navigate(['apartments'], { queryParams: this.queryParams });
    }
    setTimeout(() => {
      this.isSearchLocationInvalid = false;
      this.isCheckInOutInvalid = false;
      this.isGuestInvalid = false;
    }, 1000);
  }

  public locationSelected(location: LocationForUpdate): void {
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
    this.filterObject.location = location;
    this.queryParams['countryId'] = location.places.countryId;
    this.queryParams['cityId'] = location.places.cityId;
    this.queryParams['villageId'] = location.places.villageId;
    this.disableSearchButton =
      (this.queryParams.countryId || this.queryParams.countryId === 0) &&
      this.queryParams.startDate &&
      this.queryParams.endDate &&
      (this.queryParams.adults ||
        this.queryParams.children ||
        this.queryParams.infants);
  }

  public changeSelectedPropertyType(data: SearchPropertyFilters): void {
    if (data === SearchPropertyFilters.AllProperties) {
      this.selectedProperties = [SearchPropertyFilters.AllProperties];
      this.queryParams.propertyType = [];
      return;
    } else {
      if (
        this.selectedProperties.includes(SearchPropertyFilters.AllProperties)
      ) {
        this.selectedProperties = [];
      }
      if (this.selectedProperties.includes(data)) {
        this.selectedProperties.splice(
          this.selectedProperties.indexOf(data),
          1
        );
      } else {
        this.selectedProperties.push(data);
      }
      this.queryParams.propertyType = [...this.selectedProperties];
    }
  }

  extractSelectedLocationDisplayName(location: MunicipalityInfoData): string {
    return location.villageName !== null && location.cityName !== null
      ? location.villageName +
          ', ' +
          location.cityName +
          ', ' +
          location.countryName
      : location.villageName === null && location.cityName !== null
      ? location.cityName + ', ' + location.countryName
      : location.countryName;
  }

  goToSearchProperties(): void {
    this.router.navigate(['apartments'], {
      queryParams: {
        countryId: 1,
        cityId: 1379,
        villageId: null,
        startDate: '15-01-2023',
        endDate: '25-01-2023',
        adults: 1,
        children: 0,
        infants: 0,
      },
    });
  }
}
