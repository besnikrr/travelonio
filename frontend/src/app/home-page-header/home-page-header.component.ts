import {
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { propertyUserSessionSelector } from '../ngrx/selectors/property-user.selectors';
import { Subscription } from 'rxjs';
import { PropertyUserSession } from '../ngrx/actions/action-models';
import {
  logoutPropertyUserRequest,
  setIsBecomeAHostButtonClicked,
} from '../ngrx/actions/property-user.actions';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { LANGUAGES, LOCALSTORAGE } from '../shared/general-constants';
import { ConnectionPositionPair } from '@angular/cdk/overlay';

@Component({
  selector: 'app-home-page-header',
  templateUrl: './home-page-header.component.html',
  styleUrls: ['./home-page-header.component.scss'],
})
export class HomePageHeaderComponent implements OnInit, OnDestroy {
  @Input() transparent = false;
  @Input() customPositioning = false;
  private subscription = new Subscription();
  public session: PropertyUserSession | undefined;
  public showIcons = false;
  CONST_LANGUAGES = LANGUAGES;
  userDropdownOpened = false;
  languageDropdownOpened = false;
  notifDropdownOpened = false;
  messagesDropdownOpened = false;
  positions = [
    new ConnectionPositionPair(
      { originX: 'center', originY: 'bottom' },
      { overlayX: 'end', overlayY: 'top' }
    ),
  ];
  currentLanguage = 'EN';

  constructor(
    @Inject(PLATFORM_ID) private platformId: string,
    private store: Store,
    private router: Router
  ) {
    this.showIcons = isPlatformBrowser(platformId);
    this.subscription.add(
      this.store
        .pipe(select(propertyUserSessionSelector))
        .subscribe((session) => {
          this.session = session;
        })
    );
    if (isPlatformBrowser(this.platformId)) {
      this.currentLanguage = location.href.includes('/al') ? 'AL' : 'EN';
    }
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logoutPropertyUser(): void {
    this.store.dispatch(logoutPropertyUserRequest());
  }

  changeLanguage(lang: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(LOCALSTORAGE.LANGUAGE, lang);
      location.replace('/' + lang + this.router.url);
    }
  }

  clickBecomeAHostButton(): void {
    this.store.dispatch(setIsBecomeAHostButtonClicked({ isClicked: true }));
  }
}
