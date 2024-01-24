import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import { styles } from './mapstyles';
import {
  Location,
  LocationForUpdate,
  MunicipalityInfoData,
} from '../../model/locations';
import { MapGeocoder } from '@angular/google-maps';
import { select, Store } from '@ngrx/store';
import {
  dirtyInputs,
  propertyId,
  propertyLocation,
} from '../../../../../ngrx/selectors/properties.selectors';
import { Observable, Subscription } from 'rxjs';
import { updatePropertyRequest } from '../../../../../ngrx/actions/properties.actions';
import { Countries } from '../../../../../shared/interfaces/countries';
import { getCountriesAndCities } from '../../../../../ngrx/actions/settings.actions';
import { getLocationsList } from '../../../../../ngrx/selectors/settings.selectors';

@Component({
  selector: 'app-property-location',
  templateUrl: './property-location.component.html',
  styleUrls: ['./property-location.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PropertyLocationComponent implements OnInit {
  public location: Location;
  public propertyId: string | undefined;
  public availableCountries = [];
  public availableCities = [];
  public Countries = Countries;
  public subscription = new Subscription();
  public filteredLocations: Observable<MunicipalityInfoData[]>;
  public selectedLocationDisplayName: string;
  public dirtyInputs = this.store.pipe(select(dirtyInputs));

  zoom = 7;
  center = {
    lat: 41.1533,
    lng: 20.1683,
  };

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
    icon: '../../../../../../assets/map/marker.svg',
  };
  markerPosition: google.maps.LatLngLiteral;
  mapGeocoder: MapGeocoder;
  showModal = true;

  mapHeight = '764.047px';
  mapWidth = '641.719px';

  @HostListener('window:resize', []) updateMapSize(): void {
    if (window.innerWidth >= 1007) {
      this.mapHeight = '764.047px';
      this.mapWidth = '641.719px';
    } else if (window.innerWidth <= 1007 && window.innerWidth > 641) {
      this.mapHeight = '664.047px';
      this.mapWidth = '501px';
    } else if (window.innerWidth <= 641) {
      this.mapHeight = '664.047px';
      this.mapWidth = '100%';
    }
  }

  constructor(
    geocoder: MapGeocoder,
    private store: Store,
    private cd: ChangeDetectorRef
  ) {
    this.mapGeocoder = geocoder;
    this.updateMapSize();
    this.subscription.add(
      this.store.pipe(select(propertyLocation)).subscribe((location) => {
        if (location) {
          this.location = location;
          this.selectedLocationDisplayName =
            this.extractSelectedLocationDisplayName(location);
        }
      })
    );

    this.subscription.add(
      this.store.pipe(select(propertyId)).subscribe((id) => {
        this.propertyId = id;
      })
    );

    this.filteredLocations = this.store.pipe(select(getLocationsList));
  }

  ngOnInit(): void {
    this.availableCountries = this.Countries.getAllCountries().map((a) => {
      return {
        name: a,
      };
    });
  }

  locationUpdate(location: LocationForUpdate): void {
    this.store.dispatch(
      updatePropertyRequest({
        propertyId: this.propertyId,
        data: { location },
      })
    );
  }

  getAddress(): string {
    return `
			${this.location?.city ? `${this.location?.city},` : ''}
			${this.location?.country ? `${this.location?.country},` : ''}
			${this.location?.address ? `${this.location?.address},` : ''}
			${this.location?.zipCode ? this.location?.zipCode : ''}
		`;
  }

  addMarker(event: google.maps.MapMouseEvent): void {
    this.markerPosition = event?.latLng?.toJSON();
  }

  onSetAddress(): void {
    console.log(
      `${this.location?.address}, ${this.location?.city}, ${this.location?.country}, ${this.location?.zipCode}`
    );
    this.mapGeocoder
      .geocode({
        address: `${this.location?.address}, ${this.location?.city}, ${this.location?.country}, ${this.location?.zipCode}`,
      })
      .subscribe(({ results }) => {
        this.markerPosition = {
          lat: results[0]?.geometry.location.lat(),
          lng: results[0]?.geometry.location.lng(),
        };

        this.center = {
          lat: results[0]?.geometry.location.lat(),
          lng: results[0]?.geometry.location.lng(),
        };
        this.zoom = 18;

        this.cd.detectChanges();
      });

    this.showModal = false;
  }

  onFinalContinue(): void {
    this.store.dispatch(
      updatePropertyRequest({
        propertyId: this.propertyId,
        data: {
          location: {
            latitude: this.markerPosition?.lat
              ? this.markerPosition?.lat
              : null,
            longitude: this.markerPosition?.lng
              ? this.markerPosition?.lng
              : null,
          },
        },
      })
    );
  }

  searchLocation(search: string): void {
    this.store.dispatch(getCountriesAndCities({ queryParam: search }));
  }

  extractSelectedLocationDisplayName(location: Location): string {
    return location.village !== null && location.city !== null
      ? location.village + ', ' + location.city + ', ' + location.country
      : location.village === null && location.city !== null
      ? location.city + ', ' + location.country
      : location.country;
  }
}
