import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  hostsTermsAndConditionsDialogEnglish,
  hostsTermsAndConditionsDialogShqip,
  policyDialogEnglish,
  policyDialogShqip,
} from '../shared/terms-conditions-privacy-statment';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

export interface FooterData {
  heading: string;
  values: FooterValueData[];
}

export interface FooterValueData {
  name: string;
  url?: string;
  openPolicyDialog?: boolean;
  openTermsAndConditionDialog?: boolean;
  focusSearchField?: boolean;
  focusHeader?: boolean;
}

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements OnInit {
  public footerData: FooterData[] = [
    {
      heading: $localize`:I am text@@IAmText:I am`,
      values: [
        {
          name: $localize`:property owner text@@propertyOwnerText:Property Owner`,
          url: '/sign-up',
        },
        {
          name: $localize`:interested in booking text@@InterestedInBooking:Interested in Booking`,
          focusSearchField: true,
        },
      ],
    },
    {
      heading: $localize`:listings generic text@@listingsGeneric:Listings`,
      values: [
        {
          name: $localize`:hotel generic text@@genericHotel:Hotel`,
          focusSearchField: true,
        },
        // {
        //   name: $localize`:Resort generic text@@genericResort:Resort`,
        //   focusSearchField: true,
        // },
        // {
        //   name: $localize`:Bed & Breakfast generic text@@genericBedBreakfast:Bed & Breakfast`,
        //   focusSearchField: true,
        // },
        {
          name: $localize`:Apartment generic text@@genericApartment:Apartment`,
          focusSearchField: true,
        },
        // {
        //   name: $localize`:Villa generic text@@genericVilla:Villa`,
        //   focusSearchField: true,
        // },
        // {
        //   name: $localize`:Camping generic text@@genericCamping:Camping`,
        //   focusSearchField: true,
        // },
      ],
    },
    {
      heading: $localize`:about us generic@@aboutUsGeneric:About Us`,
      values: [
        // {
        //   name: $localize`:home generic text@@homeGeneric:Home`,
        //   focusHeader: true,
        // },
        {
          name: $localize`:company generic text@@genericCompany:Company`,
          url: '/about-us',
        },
        // {
        //   name: $localize`:Blog generic text@@genericBlog:Blog`,
        //   focusHeader: true,
        // },
        // {
        //   name: $localize`:Career generic text@@genericCareer:Career`,
        //   focusHeader: true,
        // },
        {
          name: $localize`:Contact Us generic text@@genericContactUs:Contact Us`,
          url: '/contact-us',
        },
      ],
    },
    {
      heading: $localize`:Help generic text@@HelpGeneric:Help`,
      values: [
        {
          name: $localize`:FAQ generic text@@FAQGeneric:FAQ`,
          url: '/faq',
        },
        {
          name: $localize`:How it works generic text@@HowItWorksGeneric:How it works`,
          url: '/how-it-works',
        },
        {
          name: $localize`:Cancel options generic text@@CancelOptionsGeneric:Cancel options`,
          url: '/cancel-options',
        },
      ],
    },
    {
      heading: $localize`:Legal generic text@@LegalGeneric:Legal`,
      values: [
        {
          name: $localize`:Terms and Conditions generic text@@TermsAndConditionsGeneric:Terms and Conditions`,
          url: undefined,
          openTermsAndConditionDialog: true,
        },
        {
          name: $localize`:Privacy Policy generic text@@PrivacyPolicyGeneric:Privacy Policy`,
          url: undefined,
          openPolicyDialog: true,
        },
      ],
    },
  ];
  public showIcons = false;
  currentLanguage = 'EN';

  constructor(
    @Inject(PLATFORM_ID) private platformId: string,
    public dialog: MatDialog,
    public router: Router
  ) {
    this.showIcons = isPlatformBrowser(platformId);
    if (isPlatformBrowser(this.platformId)) {
      this.currentLanguage = location.href.includes('/al') ? 'AL' : 'EN';
    }
  }

  ngOnInit(): void {}

  clickFooterOption(event: Event, option: FooterValueData): void {
    if (option.openPolicyDialog) {
      this.openPolicyDialog(event);
    } else if (option.openTermsAndConditionDialog) {
      this.openTermsAndConditionsDialog(event);
    } else if (option.focusSearchField) {
      const locationField = document.getElementById('search-location-field');
      if (locationField) {
        locationField.focus();
        locationField.scroll({ top: 0, left: 0, behavior: 'smooth' });
      }
    } else if (option.focusHeader) {
      window.scroll(0, 0);
    } else {
      this.router.navigate([option.url]);
    }
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

  navigateToHowItWorks() {
    this.router.navigate(['/how-it-works'], { fragment: 'guests' });
  }
}
