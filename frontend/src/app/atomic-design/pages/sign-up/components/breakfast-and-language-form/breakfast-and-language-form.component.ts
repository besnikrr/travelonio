import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { PropertyTypes } from '../../model/property-types';
import { MatRadioChange } from '@angular/material/radio';
import {
  PropertyPoliciesData,
  UpdatePropertyPoliciesData,
} from '../../model/sign-up.data';
import { languages } from 'src/app/shared/general-constants';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import {
  dirtyInputs,
  propertyId,
  propertyPoliciesData,
  propertyType,
} from '../../../../../ngrx/selectors/properties.selectors';
import { updatePropertyRequest } from '../../../../../ngrx/actions/properties.actions';
interface ItemData {
  item: string;
  selected: boolean;
}

@Component({
  selector: 'app-breakfast-and-language-form',
  templateUrl: './breakfast-and-language-form.component.html',
  styleUrls: ['./breakfast-and-language-form.component.scss'],
})
export class BreakfastAndLanguageFormComponent implements OnInit {
  public propertyType: PropertyTypes | undefined;
  public propertyPoliciesData: PropertyPoliciesData | undefined;
  public propertyId: string | undefined;
  public dirtyInputs = this.store.pipe(select(dirtyInputs));
  propertyTypes = PropertyTypes;
  public validators = Validators;
  isHotel = false;
  isApartment = false;

  staffLanguages = new FormControl();
  languagesList: string[] = languages;

  rawData: ItemData[] = [];
  selectData: ItemData[] = [];
  filteredData: Observable<ItemData[]>;

  filterString = '';

  public pricePerPersonText = $localize`:Price per person text@@breakfastPricePerson:Price per person`;
  public enterPricePerPersonText = $localize`:Breakfast Price Person Enter text@@breakfastPricePersonEnter:Enter your price per person`;
  public breakfastPropertySizeText = $localize`:Enter your property size text@@breakfastPropertySize:Enter your property size`;

  public subscription = new Subscription();

  constructor(private store: Store) {
    this.subscription.add(
      this.store.pipe(select(propertyType)).subscribe((s) => {
        if (s) {
          this.propertyType = s;
        }
      })
    );

    this.subscription.add(
      this.store.pipe(select(propertyPoliciesData)).subscribe((p) => {
        if (p) {
          this.propertyPoliciesData = p;
          if (this.propertyPoliciesData.staffLanguages) {
            this.selectData = this.propertyPoliciesData.staffLanguages.map(
              (l) => ({ item: l, selected: true } as ItemData)
            );
          }
        }
      })
    );

    this.subscription.add(
      this.store.pipe(select(propertyId)).subscribe((id) => {
        this.propertyId = id;
      })
    );

    this.filteredData = this.staffLanguages.valueChanges.pipe(
      startWith<string>(''),
      map((value) => (typeof value === 'string' ? value : this.filterString)),
      map((filter) => this.filter(filter))
    );
  }

  ngOnInit(): void {
    this.languagesList.forEach((item: string) => {
      this.rawData.push({ item, selected: false });
    });
  }

  displayFn(): string {
    return '';
  }

  optionClicked(event: Event, data: ItemData): void {
    event.stopPropagation();
    this.toggleSelection(data);
  }

  filter(filter: string): ItemData[] {
    this.filterString = filter;
    if (filter.length > 0) {
      return this.rawData.filter((option) => {
        return option.item.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
      });
    } else {
      return this.rawData.map((opt, index) => ({
        item: opt.item,
        selected: this.selectData[index]
          ? this.selectData[index].selected
          : false,
      }));
    }
  }

  toggleSelection(data: ItemData): void {
    this.filteredData = new Observable((obs) =>
      obs.next(
        this.rawData.map((opt, index) => ({
          item: opt.item,
          selected: this.selectData[index]
            ? this.selectData[index].selected
            : false,
        }))
      )
    );

    data.selected = !data.selected;
    if (data.selected === true) {
      if (!this.selectData.find((d) => d.item === data.item)) {
        this.selectData.push(data);
      }
    } else {
      this.selectData = this.selectData.filter((l) => l.item !== data.item);
    }

    this.updatePropertyPolicies({
      staffLanguages: this.selectData.map((l) => l.item),
    });
  }

  removeChip(data: ItemData): void {
    this.toggleSelection(data);
  }

  breakfastChanged($event: MatRadioChange): void {
    this.updatePropertyPolicies({
      breakfastIncluded: $event.value === 'yes',
    });
  }

  breakfastExtraCostChanged($event: MatRadioChange): void {
    this.updatePropertyPolicies({
      buyBreakfastPossibility: $event.value === 'yes',
    });
  }

  pricePerBreakfastChanged($event: string): void {
    if (!isNaN(Number($event))) {
      this.updatePropertyPolicies({
        breakfastPricePerPerson: +$event,
      });
    }
  }

  guestNumberChanged($event: { elementId: string; newQuantity: number }): void {
    this.updatePropertyPolicies({
      potentialGuestNumber: $event.newQuantity,
    });
  }

  propertySizeChanged($event: string): void {
    if (!isNaN(Number($event))) {
      this.updatePropertyPolicies({
        propertySquareSize: +$event,
      });
    }
  }

  roomInAnApartmentChanged($event: MatRadioChange): void {
    this.updatePropertyPolicies({
      isRoomInsideApartment: $event.value === 'yes',
    });
  }

  updatePropertyPolicies(updatePolicies: UpdatePropertyPoliciesData): void {
    this.store.dispatch(
      updatePropertyRequest({
        propertyId: this.propertyId,
        data: { propertyPoliciesData: updatePolicies },
      })
    );
  }

  setStaffLanguages(lang: string) {
    switch (lang.trim()) {
      case 'Albanian':
        return $localize`Albanian`;
      case 'Bulgarian':
        return $localize`Bulgarian`;
      case 'Croatian':
        return $localize`Croatian`;
      case 'Czech':
        return $localize`Czech`;
      case 'Danish':
        return $localize`Danish`;
      case 'Dutch':
        return $localize`Dutch`;
      case 'English':
        return $localize`English`;
      case 'Estonian':
        return $localize`Estonian`;
      case 'Finnish':
        return $localize`Finnish`;
      case 'French':
        return $localize`French`;
      case 'German':
        return $localize`German`;
      case 'Greek':
        return $localize`Greek`;
      case 'Hungarian':
        return $localize`Hungarian`;
      case 'Irish':
        return $localize`Irish`;
      case 'Italian':
        return $localize`Italian`;
      case 'Latvian':
        return $localize`Latvian`;
      case 'Lithuanian':
        return $localize`Lithuanian`;
      case 'Maltese':
        return $localize`Maltese`;
      case 'Polish':
        return $localize`Polish`;
      case 'Portuguese':
        return $localize`Portuguese`;
      case 'Romanian':
        return $localize`Romanian`;
      case 'Slovak':
        return $localize`Slovak`;
      case 'Slovenian':
        return $localize`Slovenian`;
      case 'Spanish':
        return $localize`Spanish`;
      case 'Swedish':
        return $localize`Swedish`;
      case 'Chinese (Traditional)':
        return $localize`Chinese (Traditional)`;
      case 'Hind':
        return $localize`Hind`;
      default:
        return $localize``;
    }
  }
}
