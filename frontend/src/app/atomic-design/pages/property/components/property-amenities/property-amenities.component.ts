import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Amenities } from '../../../sign-up/model/amenities.enum';
import { AmenitiesData } from '../../../sign-up/model/sign-up.data';

@Component({
  selector: 'app-property-amenities',
  templateUrl: './property-amenities.component.html',
  styleUrls: ['./property-amenities.component.scss'],
})
export class PropertyAmenitiesComponent implements OnChanges {
  @Input() amenities: AmenitiesData[];
  public hasAmenityValue = [];
  public Amenities = Amenities;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.amenities && this.amenities) {
      this.containsAmenities();
    }
  }

  public containsAmenities(): void {
    for (let i = 0; i < this.amenities.length; i++) {
      this.hasAmenityValue.push(
        this.amenities[i].option.some((o) => o.selected)
      );
    }
  }
}
