import { Component, Input, OnInit } from '@angular/core';
import { PropertySummaryInfo } from '../../../shared/interfaces/property';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-property-info',
  templateUrl: './property-info.component.html',
  styleUrls: ['./property-info.component.scss'],
})
export class PropertyInfoComponent implements OnInit {
  @Input() property: PropertySummaryInfo;
  @Input() displayBookNowAndPrice = true;
  public baseUrl = environment.baseUrl;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  public navigateToPropertyDetails(): void {
    if (this.property) {
      this.router.navigate(['booking', 'property', this.property.propertyId], {
        queryParamsHandling: 'preserve',
      });
    }
  }
}
