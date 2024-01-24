import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { isPlatformBrowser } from '@angular/common';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { sendRecoveryLinkRequest, setShowLoadingIndicator } from '../../../../../ngrx/actions/property-user.actions';
import { isShowLoadingIndicator } from '../../../../../ngrx/selectors/property-user.selectors';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: [
    './../register-property-user/register-property-user.component.scss'
  ]
})
export class ForgotPasswordComponent {
  public formGroup: FormGroup;
  public showIcons = false;
  public showLoadingIndicator = false;

  constructor(
    private store: Store,
    @Inject(PLATFORM_ID) private platformId: string
  ) {
    this.formGroup = new FormGroup({
      emailControl: new FormControl('', [Validators.required, Validators.email]),
      consentControl: new FormControl('', [Validators.required, (control) => {
        return !control.value ? { required: true } : null;
      }]),
    });

    this.showIcons = isPlatformBrowser(platformId);
    this.store
      .pipe(select(isShowLoadingIndicator))
      .subscribe((show) => (this.showLoadingIndicator = show));
  }
  hideCharacters = true;

  public getEmailErrorMessage(): string {
    if (this.formGroup.get('emailControl').hasError('required')) {
      return 'You must enter a value';
    }

    if (this.formGroup.get('emailControl').hasError('email')) {
      return 'Not a valid email';
    }

    return 'invalid';
  }

  public getConsentErrorMessage(): string {
    return 'Terms and conditions must be accepted!';
  }

  resetPassword(): void {
    if (this.formGroup.get('emailControl').valid && this.formGroup.get('consentControl').valid) {
      this.store.dispatch(
        setShowLoadingIndicator({
          show: true
        })
      );
      this.store.dispatch(
        sendRecoveryLinkRequest({
          email: this.formGroup.get('emailControl').value
        })
      );
    }
  }
}
