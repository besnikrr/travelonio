import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { getCurrentRouteState } from '../../../../../ngrx/reducers';
import { isPlatformBrowser } from '@angular/common';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-guest-inputs',
  templateUrl: './guest-inputs.component.html',
  styleUrls: ['./guest-inputs.component.scss'],
})
export class GuestInputsComponent implements OnInit {
  @Input() category: string;
  @Input() id: number;
  @Input() gender: { title: string; value: number }[];
  @Input() inputsAmount: number[];

  selectedGender;
  firstname;
  lastname;

  public nameText = $localize`:name text@@nameText:Name`;
  public lastNameText = $localize`:last name text@@lastNameText:Lastname`;
  public validators = Validators;

  constructor(
    private store: Store,
    @Inject(PLATFORM_ID) private platformId: string
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.selectedGender = this.get('gender');
      this.firstname = this.get('firstname');
      this.lastname = this.get('lastname');
      this.store.select(getCurrentRouteState).subscribe((route) => {
        // @ts-ignore
        const queryParams = route.state.queryParams;
      });
    }
  }

  genderSelected($event: MatSelectChange): void {
    this.set('gender', $event.value);
  }

  nameChanged($event: string): void {
    this.set('firstname', $event);
  }

  lastnameChanged($event: string): void {
    this.set('lastname', $event);
  }

  set(inputType: string, value: string): void {
    const oldState = localStorage.getItem('guests');
    if (oldState === null) {
      const data = {};
      data[this.getId(inputType)] = value;
      localStorage.setItem('guests', JSON.stringify(data));
    } else {
      const data = new Object(JSON.parse(oldState));
      data[this.getId(inputType)] = value;
      localStorage.setItem('guests', JSON.stringify(data));
    }
  }

  get(inputType: string): null | string {
    const oldState = localStorage.getItem('guests');
    if (oldState === null) {
      if (inputType === 'gender') {
        return '0';
      }
      return null;
    } else {
      const data = new Object(JSON.parse(oldState));
      const field = data[this.getId(inputType)];
      if (field === undefined && inputType === 'gender') {
        return '0';
      }
      return field;
    }
  }

  getId(inputType: string): string {
    return this.category + '-' + this.id + '-' + inputType;
  }
}
