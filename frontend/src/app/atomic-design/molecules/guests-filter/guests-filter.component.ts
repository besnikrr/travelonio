import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  EventEmitter,
  Input,
  KeyValueDiffer,
  KeyValueDiffers,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { SearchedGuests } from '../../../shared/interfaces/guest';

@Component({
  selector: 'app-guests-filter',
  templateUrl: './guests-filter.component.html',
  styleUrls: ['./guests-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuestsFilterComponent implements DoCheck, OnChanges {
  @Input() selectedGuests: SearchedGuests;
  @Input() showPlaceholder: boolean;
  @Input() preventGuestChange = false;
  @Output() searchChange = new EventEmitter<SearchedGuests>();

  public adultsCounter = 0;
  public childrenCounter = 0;
  public infantCounter = 0;
  public searchPlaceholder = '';
  public value = {
    adults: 0,
    children: 0,
    infants: 0,
  };
  differ: KeyValueDiffer<string, any>;

  constructor(private differs: KeyValueDiffers) {
    this.differ = this.differs.find({}).create();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedGuests']) {
      this.value = {
        adults:
          this.selectedGuests.adults +
          this.selectedGuests.children +
          this.selectedGuests.infants,
        children:
          this.selectedGuests.adults +
          this.selectedGuests.children +
          this.selectedGuests.infants,
        infants:
          this.selectedGuests.adults +
          this.selectedGuests.children +
          this.selectedGuests.infants,
      };
      this.adultsCounter = this.selectedGuests.adults;
      this.childrenCounter = this.selectedGuests.children;
      this.infantCounter = this.selectedGuests.infants;
    }
  }

  ngDoCheck(): void {
    const change = this.differ.diff(this);

    if (change) {
      change.forEachChangedItem((item) => {
        this.value.adults =
          this.adultsCounter + this.childrenCounter + this.infantCounter;
      });
    }

    this.searchPlaceholder = this.value.adults
      ? this.value.adults +
        (this.value.adults > 1
          ? $localize`: Persons@@Persons: Persons`
          : $localize`: Person@@Person: Person`)
      : '';
  }

  decreaseFn(type: string): void {
    if (type === 'adult') {
      this.adultsCounter--;
    } else if (type === 'children') {
      this.childrenCounter--;
    } else if (type === 'infant') {
      this.infantCounter--;
    }
    this.searchChange.emit({
      adults: this.adultsCounter,
      children: this.childrenCounter,
      infants: this.infantCounter,
    });
  }

  increaseFn(type: string): void {
    if (type === 'adult') {
      this.adultsCounter++;
    } else if (type === 'children') {
      this.childrenCounter++;
    } else if (type === 'infant') {
      this.infantCounter++;
    }
    this.searchChange.emit({
      adults: this.adultsCounter,
      children: this.childrenCounter,
      infants: this.infantCounter,
    });
  }
}
