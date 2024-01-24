import { Options } from '@angular-slider/ngx-slider';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-price-range',
  templateUrl: './price-range.component.html',
  styleUrls: ['./price-range.component.scss'],
})
export class PriceRangeComponent implements OnInit {
  @Input() priceRange: { startPrice: number; endPrice: number };
  @Input() selectedMinPrice: number;
  @Input() selectedMaxPrice: number;

  @Output() priceRangeSelected = new EventEmitter<{
    selectedMinPrice: number;
    selectedMaxPrice: number;
  }>();
  priceRangeText: string = $localize`:Price per Night@@pricePerNight:Price per Night`;

  options: Options = {};

  constructor() {}

  ngOnInit(): void {
    if (this.selectedMinPrice && this.selectedMaxPrice) {
      this.priceRangeText = `€ ${this.selectedMinPrice} - ${this.selectedMaxPrice} / night`;
    }
    this.options = {
      floor: this.priceRange.startPrice,
      ceil: this.priceRange.endPrice,
      translate: (value: number): string => {
        return '€' + value;
      },
    };
  }

  onPriceRangeChange(event: any) {
    this.priceRangeSelected.emit({
      selectedMinPrice: event.value,
      selectedMaxPrice: event.highValue,
    });
    this.priceRangeText = `€ ${event.value} - ${event.highValue} / night`;
  }
}
