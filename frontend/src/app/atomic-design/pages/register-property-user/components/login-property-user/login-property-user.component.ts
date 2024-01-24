import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { loginPropertyUserRequest, setShowLoadingIndicator } from '../../../../../ngrx/actions/property-user.actions';
import { isPlatformBrowser } from '@angular/common';
import { isShowLoadingIndicator } from '../../../../../ngrx/selectors/property-user.selectors';

@Component({
  selector: 'app-login-property-user',
  templateUrl: './login-property-user.component.html',
  styleUrls: [
    './../register-property-user/register-property-user.component.scss'
  ]
})
export class LoginPropertyUserComponent {
  public formGroup: FormGroup;
  public showIcons = false;
  public showLoadingIndicator = false;

  constructor(
    private store: Store,
    @Inject(PLATFORM_ID) private platformId: string
  ) {
    this.formGroup = new FormGroup({
      emailControl: new FormControl('', [Validators.required, Validators.email]),
      passwordControl: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
    this.showIcons = isPlatformBrowser(platformId);
    this.store
      .pipe(select(isShowLoadingIndicator))
      .subscribe((show) => (this.showLoadingIndicator = show));
  }
  hideCharacters = true;

  public getEmailErrorMessage(): string {
    if (this.formGroup.get('emailControl').hasError('required')) {
      return $localize`:You must enter a value text@@mustEnterValueText:You must enter a value`;
    }

    if (this.formGroup.get('emailControl').hasError('email')) {
      return $localize`:Not a valid email text@@notValidEmail:Not a valid email`;
    }

    return $localize`:Invalid@@invalid:invalid`;
  }

  public getPasswordErrorMessage(): string {
    if (this.formGroup.get('passwordControl').hasError('required')) {
      return $localize`:You must enter a value text@@mustEnterValueText:You must enter a value`;
    }

    if (this.formGroup.get('passwordControl').hasError('minlength')) {
      return $localize`:Password must be at least 6 chars text@@passwordMinLength:Password must be at least 6 chars`;
    }

    return $localize`:Invalid@@invalid:invalid`;
  }

  public getConsentErrorMessage(): string {
    return 'Terms and conditions must be accepted!';
  }

  public togglePasswordVisibility(event: Event): void {
    event.preventDefault();
    this.hideCharacters = !this.hideCharacters;
  }
  loginUser(): void {
    if (this.formGroup.valid) {
      this.store.dispatch(
        setShowLoadingIndicator({
          show: true
        })
      );
      this.store.dispatch(
        loginPropertyUserRequest({
          loginPropertyUser: {
            email: this.formGroup.get('emailControl').value,
            password: this.formGroup.get('passwordControl').value
          }
        })
      );
    }
  }
}
