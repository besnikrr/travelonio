import { Component, HostListener, Input, OnInit } from '@angular/core';
import { styles } from './mapstyles';

@Component({
  selector: 'app-property-map',
  templateUrl: './property-map.component.html',
  styleUrls: ['./property-map.component.scss'],
})
export class PropertyMapComponent implements OnInit {
  @Input() latitude: number | undefined;
  @Input() longitude: number | undefined;

  zoom: number = 12;
  center = {
    lat: 41.1533,
    lng: 20.1683,
  };
  mapHeight = '337px';
  mapWidth = '880px';
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

  markerPosition: google.maps.LatLngLiteral = {
    lat: 41.1533,
    lng: 20.1683,
  };

  @HostListener('window:resize', []) updateMapSize() {
    if (window.innerWidth >= 1007) {
      this.mapHeight = '337px';
      this.mapWidth = '830px';
    } else if (window.innerWidth <= 1007 && window.innerWidth > 641) {
      this.mapHeight = '337px';
      this.mapWidth = '500px';
    } else if (window.innerWidth <= 641) {
      this.mapHeight = '337px';
      this.mapWidth = '100%';
    }
  }

  constructor() {
    this.updateMapSize();
  }

  ngOnInit(): void {}

  setLocation() {
    if (!this.latitude && !this.longitude) {
      return {
        lat: 41.1533,
        lng: 20.1683,
      };
    }
    return {
      lat: this.latitude,
      lng: this.longitude,
    };
  }
}
