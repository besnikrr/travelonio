import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, startWith } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {
  LocationForUpdate,
  MunicipalityInfoData,
} from '../../../atomic-design/pages/sign-up/model/locations';

@Component({
  selector: 'app-search-location-field',
  templateUrl: './search-location-field.component.html',
  styleUrls: ['./search-location-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchLocationFieldComponent
  implements OnInit, OnDestroy, OnChanges
{
  @Input() label: string | undefined;
  @Input() placeholder: string | undefined;
  @Input() deactivate = false;
  @Input() selectedValue: string | undefined;
  @Input() filteredLocations: MunicipalityInfoData[] = [];
  @Output() searchChange = new EventEmitter<string>();
  @Output() locationSelected = new EventEmitter<LocationForUpdate>();

  myControl = new FormControl();
  private subscription = new Subscription();

  constructor() {}

  ngOnInit(): void {
    this.subscription.add(
      this.myControl.valueChanges
        .pipe(debounceTime(300), startWith(''))
        .subscribe((ctrl) => {
          if (typeof ctrl === 'string') {
            this.searchChange.emit(ctrl);
          }
        })
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['selectedValue'] && this.selectedValue) {
      this.myControl.setValue(this.selectedValue);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  optionSelected(val: MatAutocompleteSelectedEvent): void {
    const place =
      val.option.value.locationDisplayName +
      ', ' +
      val.option.value.cityName +
      ', ' +
      val.option.value.countryName;
    this.myControl.setValue(place);
    if (
      !this.selectedValue ||
      val.option.value.locationDisplayName !== this.selectedValue
    ) {
      this.locationSelected.emit({
        places: {
          cityId: val.option.value.cityId,
          villageId: val.option.value.villageId,
          countryId: val.option.value.countryId,
        },
      });
    } else {
      this.myControl.setValue(this.selectedValue);
    }
  }
}
