import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../notification.service';
import { MatDialog } from '@angular/material/dialog';
import { isPlatformBrowser } from '@angular/common';
import {
  hostsTermsAndConditionsDialogEnglish,
  hostsTermsAndConditionsDialogShqip,
  policyDialogEnglish,
  policyDialogShqip,
} from 'src/app/shared/terms-conditions-privacy-statment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit, OnDestroy {
  public consentControl = new FormControl({ value: true });
  public subscription = new Subscription();
  currentLanguage = 'EN';

  constructor(
    @Inject(PLATFORM_ID) private platformId: string,
    private notificationService: NotificationService,
    public dialog: MatDialog
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.currentLanguage = location.href.includes('/al') ? 'AL' : 'EN';
    }
  }

  ngOnInit(): void {
    this.consentControl.valueChanges.subscribe((value) => {
      this.notificationService.acceptTerms(value);
      // do something with value here
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public getConsentErrorMessage(): string {
    return $localize`: Terms and conditions must be accepted text@@termsAndConditionMustBeAccepted: Terms and conditions must be accepted!`;
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
}
