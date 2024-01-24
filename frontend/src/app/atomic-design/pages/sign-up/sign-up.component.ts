import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, Subscription } from 'rxjs';
import {
  acceptedTermsOfSelectedPropertySelector,
  propertiesSelector,
} from '../../../ngrx/selectors/properties.selectors';
import { Property } from '../../../ngrx/reducers/properties.reducers';

import {
  createPropertyRequest,
  deletePropertyRequest,
  getPropertiesRequest,
} from '../../../ngrx/actions/properties.actions';
import {
  showTermsAndConditionsErrorInSignUp,
  signUpStepsCompleted,
} from '../../../ngrx/actions/property-user.actions';
import { getBedsRequest } from '../../../ngrx/actions/beds.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { isBecomeAHostButtonClicked } from '../../../ngrx/selectors/property-user.selectors';
import {
  hostsTermsAndConditionsDialogEnglish,
  hostsTermsAndConditionsDialogShqip,
  openHelpDialogEnglish,
  openHelpDialogShqip,
  policyDialogEnglish,
  policyDialogShqip,
} from '../../../shared/terms-conditions-privacy-statment';
import { MatDialog } from '@angular/material/dialog';
import { getCurrentRouteState } from '../../../ngrx/reducers';
import { isPlatformBrowser } from '@angular/common';
import { openWelcomeModal } from '../../../ngrx/selectors/settings.selectors';
import { WelcomeDialogComponent } from '../../molecules/welcome-dialog/welcome-dialog.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit, OnDestroy {
  public myProperties: Property[] | undefined;
  public acceptedTermsOfSelectedProperty: boolean | undefined;
  public selectedPropertyId: string;
  currentLanguage = 'EN';

  public stepsCount = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
  ];

  public signUpShortDesc = [
    $localize`:List of properties description@@listOfProperties:List of properties.`,
    $localize`:Set property type description @@setPropertyType:Set property type.`,
    $localize`:Set property name and picture description @@setPropertyNameAndPicture:Set property name and picture.`,
    $localize`:List of rooms description @@listOfRooms:List of rooms.`,
    $localize`:Set property location description @@setPropertyLocation:Set property location.`,
    $localize`:Set property keywords description @@setPropertyKeywords:Set property keywords.`,
    $localize`:Property amenities description @@propertyAmenities:Property amenities.`,
    $localize`:Services that the property has to offer description @@servicesThatThePropertyHasToOffer:Services that the property has to offer.`,
    $localize`:House rules description @@houseRules:House rules.`,
    $localize`:Property description description @@propertyDescription:Property description.`,
    $localize`:Set promotional prices description @@setPromotionalPrices:Set promotional prices.`,
    $localize`:Tariff plan & cancellation rules description @@tariffPlanCancellationRules:Tariff plan & cancellation rules.`,
    $localize`:Room details overview description @@roomDetailsOverview:Room details overview.`,
    $localize`:Set payment options description @@setPaymenToOptions:Set payment options.`,
    $localize`:Bank details description @@bankDetails:Bank details.`,
    $localize`:Property details description @@propertyDetails:Property details.`,
    $localize`:Ready for booking description @@readyForBooking:Ready for booking?`,
  ];

  public signUpJourneyStep: number;
  public showStepInfo: number | undefined = undefined;
  private subscription = new Subscription();
  propertyId: string;
  public currentRoute: any;
  public currentStep: number;
  public isBrowser = false;

  constructor(
    private store: Store,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    @Inject(PLATFORM_ID) private platformId: string
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      this.store.dispatch(getPropertiesRequest());
      this.store.dispatch(getBedsRequest());
    }

    combineLatest([
      this.store.select(openWelcomeModal),
      this.store.select(isBecomeAHostButtonClicked),
    ]).subscribe(([openModal, isButtonClicked]) => {
      if (openModal && isButtonClicked) {
        this.dialog.open(WelcomeDialogComponent);
      } else {
        this.dialog.closeAll();
      }
    });

    this.subscription.add(
      this.store.pipe(select(propertiesSelector)).subscribe((properties) => {
        this.myProperties = properties;
      })
    );
    //
    this.subscription.add(
      this.store.pipe(select(getCurrentRouteState)).subscribe((routes) => {
        this.currentRoute = routes;
        const stepId = +this.currentRoute.state.params.stepId;
        if (isNaN(stepId)) {
          this.currentStep = 0;
        } else {
          this.currentStep = stepId;
        }
      })
    );

    this.subscription.add(
      this.store
        .pipe(select(acceptedTermsOfSelectedPropertySelector))
        .subscribe((accepted) => {
          this.acceptedTermsOfSelectedProperty = accepted;
        })
    );
    if (isPlatformBrowser(this.platformId)) {
      this.currentLanguage = location.href.includes('/al') ? 'AL' : 'EN';
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {}

  onSignUpCompleted(event: boolean): void {
    this.store.dispatch(signUpStepsCompleted({ completed: event }));
  }

  onShowTermsAndConditionsErrorInSignUp(event: boolean): void {
    this.store.dispatch(showTermsAndConditionsErrorInSignUp({ show: event }));
  }

  selectStep(selectedStep: number): void {}

  createProperty(): void {
    this.store.dispatch(createPropertyRequest());
  }

  selectProperty(propertyId: string): void {
    this.propertyId = propertyId;
    this.router.navigate(['property/' + propertyId], {
      relativeTo: this.activatedRoute,
    });
  }

  reviewProperty(): void {
    this.router.navigate(
      ['booking', 'property', this.currentRoute.state.params.propertyId],
      { queryParams: { allRooms: true } }
    );
  }

  changeStepperValue(step: {
    currentStepId: number;
    nextStepId: number;
  }): void {
    // if (value !== 16) {
    //   this.store.dispatch(signUpStepsCompleted({ completed: false }));
    // }
    // this.signUpJourneyStep = value;
    // window.localStorage.setItem(
    //   'signUpJourneyStep',
    //   this.signUpJourneyStep.toString()
    // );
    // this.store.dispatch(changeStepperValue({ newValue: value }));
    // if (value !== 0) {
    //   this.router.navigate([
    //     '/sign-up/property/' + this.propertyId + '/steps/' + value,
    //   ]);
    // }
    if (step.nextStepId === 0) {
      this.router.navigate(['sign-up']);
    } else {
      this.router.navigate([
        '/sign-up/property/' +
          this.currentRoute.state.params.propertyId +
          '/steps/' +
          step.nextStepId,
      ]);
    }
  }

  deleteProperty($event: string): void {
    this.store.dispatch(deletePropertyRequest({ propertyId: $event }));
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

  openHelpDialog(event: Event): void {
    if (this.currentLanguage === 'EN') {
      openHelpDialogEnglish(event, this.dialog);
    } else if (this.currentLanguage === 'AL') {
      openHelpDialogShqip(event, this.dialog);
    }
  }

  navigateFromBreadCrumb(step: number): void {
    this.changeStepperValue({
      currentStepId: +this.currentRoute.state.params.stepId,
      nextStepId: step,
    });
  }

  getProperty() {
    return this.myProperties?.find(
      (property: Property) =>
        property.propertyId === this.currentRoute.state.params.propertyId
    );
  }

  getPropertyName() {
    return this.getProperty()?.name;
  }
}
