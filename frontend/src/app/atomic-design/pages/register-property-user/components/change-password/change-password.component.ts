import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { isPlatformBrowser } from '@angular/common';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyUsersService } from '../../../../../ngrx/services/property-user-service';
import { changePasswordRequest, setShowLoadingIndicator } from '../../../../../ngrx/actions/property-user.actions';
import { isShowLoadingIndicator } from '../../../../../ngrx/selectors/property-user.selectors';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: [
    './../register-property-user/register-property-user.component.scss'
  ]
})
export class ChangePasswordComponent implements OnInit {
  public formGroup: FormGroup;
  public showIcons = false;
  public hideCharacters = true;
  private userId: string;
  private token: string;
  public showLoadingIndicator = false;

  constructor(
    private store: Store,
    @Inject(PLATFORM_ID) private platformId: string,
    private route: ActivatedRoute,
    private router: Router,
    private us: PropertyUsersService
  ) {
    this.formGroup = new FormGroup({
      passwordControl: new FormControl('', [Validators.required, Validators.minLength(6)]),
      consentControl: new FormControl('', [(control) => {
        return !control.value ? { required: true } : null;
      }]),
    });
    this.showIcons = isPlatformBrowser(platformId);
    this.store
      .pipe(select(isShowLoadingIndicator))
      .subscribe((show) => (this.showLoadingIndicator = show));
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params.userId && params.token) {
        this.userId = params.userId;
        this.token = params.token;
      } else {
        this.router.navigate(['login']);
      }
    });
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

  public getConsentErrorMessage(): string {
    return 'Terms and conditions must be accepted!';
  }

  changePassword(): void {
    if (this.formGroup.valid) {
      if (this.userId && this.token) {
        this.store.dispatch(
          setShowLoadingIndicator({
            show: true
          })
        );
        this.store.dispatch(
          changePasswordRequest({
            userId: this.userId,
            newPassword: this.formGroup.get('passwordControl').value,
            token: this.token
          })
        );
      }
    }
  }
}
