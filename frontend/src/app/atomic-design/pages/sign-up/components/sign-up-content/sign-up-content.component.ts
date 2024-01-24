import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  PLATFORM_ID,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from '../../../../../ngrx/reducers/properties.reducers';
import { Store } from '@ngrx/store';
import { isPlatformBrowser } from '@angular/common';
import { updateUserSelfRequest } from '../../../../../ngrx/actions/property-user.actions';

@Component({
  selector: 'app-sign-up-content',
  templateUrl: './sign-up-content.component.html',
  styleUrls: ['./sign-up-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpContentComponent implements OnInit {
  @Input() myProperties: Property[] | undefined;
  @Input() signUpJourneyStep: number;
  @Input() selectedPropertyId: string;
  @Input() propertyId: string;
  @Input() currentRoute: any;
  @Input() currentStep: number;

  @Output() onSignUpStepsCompleted = new EventEmitter<boolean>();
  @Output() changeStepperValue = new EventEmitter<{
    currentStepId: number;
    nextStepId: number;
  }>();
  @Output() showTermsAndConditionsErrorInSignUp = new EventEmitter<boolean>();
  @Output() createProperty = new EventEmitter<void>();
  @Output() selectProperty = new EventEmitter<string>();
  @Output() deleteProperty = new EventEmitter<string>();
  currentLanguage = 'AL';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store,
    @Inject(PLATFORM_ID) private platformId: string
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.currentLanguage = location.href.includes('/al') ? 'AL' : 'EN';
    }
  }

  ngOnInit(): void {}

  onFinish(): void {
    this.store.dispatch(
      updateUserSelfRequest({
        language: this.currentLanguage,
      })
    );
    this.changeStepperValue.emit({ currentStepId: 17, nextStepId: 0 });
  }

  onBack(): void {
    this.changeStepperValue.emit({
      currentStepId: this.currentStep,
      nextStepId: this.currentStep - 1,
    });
    if (this.currentStep === 1) {
      this.router.navigate(['/sign-up']);
    }
  }

  onNext(): void {
    this.changeStepperValue.emit({
      currentStepId: this.currentStep,
      nextStepId: this.currentStep + 1,
    });
  }
}
