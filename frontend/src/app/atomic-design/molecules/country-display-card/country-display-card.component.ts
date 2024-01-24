import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { CountryData } from '../../../home-page/hp-display-data/home-page-data';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-country-display-card',
  templateUrl: './country-display-card.component.html',
  styleUrls: ['./country-display-card.component.scss']
})
export class CountryDisplayCardComponent {
  @Input() country: CountryData;
  public showIcons = false;

  constructor(@Inject(PLATFORM_ID) private platformId: string) {
    this.showIcons = isPlatformBrowser(platformId);
  }
}
