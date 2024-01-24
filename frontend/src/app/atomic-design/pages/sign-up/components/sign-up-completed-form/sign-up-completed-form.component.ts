import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { CustomDialogComponent } from '../custom-dialog/custom-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {
  policyDialogEnglish,
  hostsTermsAndConditionsDialogEnglish,
  hostsTermsAndConditionsDialogShqip,
  policyDialogShqip,
} from '../../../../../shared/terms-conditions-privacy-statment';
import { updatePropertyRequest } from '../../../../../ngrx/actions/properties.actions';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
  dirtyInputs,
  propertyId,
  propertyReadyForBooking,
  propertySelector,
} from '../../../../../ngrx/selectors/properties.selectors';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { isPlatformBrowser } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-sign-up-completed-form',
  templateUrl: './sign-up-completed-form.component.html',
  styleUrls: ['./sign-up-completed-form.component.scss'],
})
export class SignUpCompletedFormComponent implements OnInit {
  public readyToStartBooking: {
    ready: boolean | undefined;
    startDate: string | undefined;
    termsAndConditionAccepted: boolean;
  };
  isPropertyActive: boolean;

  public propertyId: string | undefined;
  public subscription = new Subscription();
  public dirtyInputs = this.store.pipe(select(dirtyInputs));
  currentLanguage = 'EN';

  dateNow = moment(new Date()).format('DD-MM-YYYY') as string;
  notSure;

  constructor(
    public dialog: MatDialog,
    private store: Store,
    @Inject(PLATFORM_ID) private platformId: string
  ) {
    this.subscription.add(
      this.store.pipe(select(propertyId)).subscribe((id) => {
        this.propertyId = id;
      })
    );

    this.subscription.add(
      this.store.pipe(select(propertyReadyForBooking)).subscribe((details) => {
        this.readyToStartBooking = details;
      })
    );

    this.subscription.add(
      this.store.pipe(select(propertySelector)).subscribe((property) => {
        if (property) {
          this.isPropertyActive = property.active;
        }
      })
    );

    if (isPlatformBrowser(this.platformId)) {
      this.currentLanguage = location.href.includes('/al') ? 'AL' : 'EN';
    }
  }

  ngOnInit(): void {
    this.notSure = this.readyToStartBooking.startDate === '';
  }

  readyForBooking(
    readyForBooking: boolean | undefined,
    $event: MatDatepickerInputEvent<unknown, unknown | null>
  ): void {
    if (readyForBooking) {
      this.store.dispatch(
        updatePropertyRequest({
          propertyId: this.propertyId,
          data: {
            readyForBooking,
          },
        })
      );
    } else {
      this.store.dispatch(
        updatePropertyRequest({
          propertyId: this.propertyId,
          data: {
            readyForBooking,
            startBookingDate: moment($event.value).format(
              'DD-MM-YYYY'
            ) as string,
          },
        })
      );
    }
  }

  acceptTermsAndConditions(event: MatCheckboxChange): void {
    this.store.dispatch(
      updatePropertyRequest({
        propertyId: this.propertyId,
        data: {
          acceptedTermAndConditions: event.checked,
        },
      })
    );
  }

  update(ready: boolean, startDate?: string): void {
    if (startDate) {
      this.store.dispatch(
        updatePropertyRequest({
          propertyId: this.propertyId,
          data: {
            readyForBooking: ready,
            startBookingDate: startDate,
          },
        })
      );
    } else {
      this.store.dispatch(
        updatePropertyRequest({
          propertyId: this.propertyId,
          data: {
            readyForBooking: ready,
            startBookingDate: '',
          },
        })
      );
    }
  }

  updateNotSure() {
    this.notSure = !this.notSure;
    this.notSure ? this.update(false, '') : this.update(false, this.dateNow);
  }

  openTermsAndConditionsDialog(event: Event): void {
    if (this.currentLanguage === 'EN') {
      hostsTermsAndConditionsDialogEnglish(event, this.dialog);
    } else if (this.currentLanguage === 'AL') {
      hostsTermsAndConditionsDialogShqip(event, this.dialog);
    }
  }

  openPolicyDialog(event: Event): void {
    if (this.currentLanguage === 'EN') {
      policyDialogEnglish(event, this.dialog);
    } else if (this.currentLanguage === 'AL') {
      policyDialogShqip(event, this.dialog);
    }
  }

  deactivateProperty(event: MatSlideToggleChange): void {
    if (event.source.checked) {
      const dialogRef = this.dialog.open(CustomDialogComponent, {
        width: '639.72px',
        panelClass: 'custom-dialog',
        data: {
          title: $localize`:You are about to deactivate your property, are you sure you want to proceed? @@deactivatePropertyTitle: You are about to deactivate your property, are you sure you want to proceed?`,
          footerButtonName: 'YES',
          secondFooterButtonName: 'NO',
        },
      });

      dialogRef.componentInstance.onButtonClicked.subscribe(() => {
        this.store.dispatch(
          updatePropertyRequest({
            propertyId: this.propertyId,
            data: { active: false },
          })
        );
        this.isPropertyActive = false;
        dialogRef.close();
      });
      dialogRef.componentInstance.onSecondButtonClicked.subscribe(() => {
        this.store.dispatch(
          updatePropertyRequest({
            propertyId: this.propertyId,
            data: { active: true },
          })
        );
        this.isPropertyActive = true;
        event.source.checked = false;
        dialogRef.close();
      });
      dialogRef.afterClosed().subscribe((result) => {});
    } else {
      this.store.dispatch(
        updatePropertyRequest({
          propertyId: this.propertyId,
          data: { active: true },
        })
      );
      this.isPropertyActive = true;
      this.dialog.open(CustomDialogComponent, {
        width: '639.72px',
        panelClass: 'custom-dialog',
        data: {
          title: $localize`:Your property is activated! @@activatedPropertyTitle: Your property is activated!`,
          info: true,
        },
      });
    }
  }
}
