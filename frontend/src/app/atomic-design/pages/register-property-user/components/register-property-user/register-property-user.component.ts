import { Component, Inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import {
  registerPropertyUserRequest,
  setShowLoadingIndicator,
} from '../../../../../ngrx/actions/property-user.actions';
import { select, Store } from '@ngrx/store';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { INTL_PHONE_NUMBER_REGEX } from 'src/app/shared/general-constants';
import { isShowLoadingIndicator } from '../../../../../ngrx/selectors/property-user.selectors';
import { openWelcomeModal } from '../../../../../ngrx/selectors/settings.selectors';
import { WelcomeDialogComponent } from '../../../../molecules/welcome-dialog/welcome-dialog.component';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import {
  guestsTermsAndConditionsDialogEnglish,
  guestsTermsAndConditionsDialogShqip,
  policyDialogEnglish,
  policyDialogShqip,
} from '../../../../../shared/terms-conditions-privacy-statment';

@Component({
  selector: 'app-register-property-user',
  templateUrl: './register-property-user.component.html',
  styleUrls: ['./register-property-user.component.scss'],
})
export class RegisterPropertyUserComponent implements OnDestroy {
  public showLoadingIndicator = false;
  private subscription = new Subscription();
  public formGroup: FormGroup;
  currentLanguage = 'EN';

  constructor(
    private store: Store,
    @Inject(PLATFORM_ID) private platformId: string,
    public dialog: MatDialog
  ) {
    this.formGroup = new FormGroup({
      firstnameControl: new FormControl('', [Validators.required]),
      lastnameControl: new FormControl('', [Validators.required]),
      emailControl: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      passwordControl: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      phoneControl: new FormControl('', [
        Validators.pattern(INTL_PHONE_NUMBER_REGEX),
      ]),
      consentControl: new FormControl('', [
        (control) => {
          return !control.value ? { required: true } : null;
        },
      ]),
    });
    this.showIcons = isPlatformBrowser(platformId);
    this.store
      .pipe(select(isShowLoadingIndicator))
      .subscribe((show) => (this.showLoadingIndicator = show));
    this.subscription.add(
      this.store
        .pipe(select(openWelcomeModal))
        .subscribe((openModal: boolean) => {
          if (openModal) {
            this.dialog.open(WelcomeDialogComponent);
          } else {
            this.dialog.closeAll();
          }
        })
    );

    if (isPlatformBrowser(this.platformId)) {
      this.currentLanguage = location.href.includes('/al') ? 'AL' : 'EN';
    }
  }

  public showIcons = false;
  public validators = Validators;
  hideCharacters = true;

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public getFirstnameErrorMessage(): string {
    if (this.formGroup.get('lastnameControl').hasError('required')) {
      return 'You must enter a value';
    }
    return 'invalid';
  }

  public getLastnameErrorMessage(): string {
    if (this.formGroup.get('lastnameControl').hasError('required')) {
      return 'You must enter a value';
    }
    return 'invalid';
  }

  public getEmailErrorMessage(): string {
    if (this.formGroup.get('emailControl').hasError('required')) {
      return 'You must enter a value';
    }

    if (this.formGroup.get('emailControl').hasError('email')) {
      return 'Not a valid email';
    }

    return 'invalid';
  }

  public getPasswordErrorMessage(): string {
    if (this.formGroup.get('passwordControl').hasError('required')) {
      return 'You must enter a value';
    }

    if (this.formGroup.get('passwordControl').hasError('minlength')) {
      return 'Password must be at least 6 chars';
    }

    return 'invalid';
  }

  public getPhoneErrorMessage(): string {
    if (this.formGroup.get('phoneControl').hasError('pattern')) {
      return 'Only numbers with prefix are allowed';
    }
    return 'invalid';
  }

  public getConsentErrorMessage(): string {
    return 'Terms and conditions must be accepted!';
  }

  registerUser(): void {
    if (this.formGroup.valid) {
      this.store.dispatch(
        setShowLoadingIndicator({
          show: true,
        })
      );
      this.store.dispatch(
        registerPropertyUserRequest({
          registerPropertyUser: {
            email: this.formGroup.get('emailControl').value,
            name: this.formGroup.get('firstnameControl').value,
            lastname: this.formGroup.get('lastnameControl').value,
            password: this.formGroup.get('passwordControl').value,
            phone: this.formGroup.get('phoneControl').value,
          },
        })
      );
    }
  }

  openPolicyDialog(event: Event): void {
    if (this.currentLanguage === 'EN') {
      policyDialogEnglish(event, this.dialog);
    } else if (this.currentLanguage === 'AL') {
      policyDialogShqip(event, this.dialog);
    }
  }

  openTermsAndConditions(event: Event): void {
    if (this.currentLanguage === 'EN') {
      guestsTermsAndConditionsDialogEnglish(event, this.dialog);
    } else if (this.currentLanguage === 'AL') {
      guestsTermsAndConditionsDialogShqip(event, this.dialog);
    }
  }
}
