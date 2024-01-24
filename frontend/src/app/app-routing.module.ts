import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { SignUpComponent } from './atomic-design/pages/sign-up/sign-up.component';
import { RegisterPropertyUserComponent } from './atomic-design/pages/register-property-user/components/register-property-user/register-property-user.component';
import { LoginPropertyUserComponent } from './atomic-design/pages/register-property-user/components/login-property-user/login-property-user.component';
import { EmailVerificationComponent } from './atomic-design/pages/register-property-user/components/email-verification/email-verification.component';
import { ForgotPasswordComponent } from './atomic-design/pages/register-property-user/components/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './atomic-design/pages/register-property-user/components/change-password/change-password.component';
import { PropertyComponent } from './atomic-design/pages/property/property.component';
import { AuthenticationGuard } from './guards/authentication-guard.service';
import { PropertyGuardService } from './guards/property-guard.service';
import { PropertyListComponent } from './atomic-design/pages/property-list/property-list.component';
import { PropertyListGuardService } from './guards/property-list-guard.service';
import { AboutUsComponent } from './atomic-design/organisms/about-us/about-us.component';
import { ReservationCompleteComponent } from './atomic-design/pages/booking/components/reservation-complete/reservation-complete.component';
import { ReservationCompleteGuardService } from './guards/reservation-complete-guard.service';
import { JwtCheckGuardService } from './guards/jwt-check-guard.service';
import { FaqComponent } from './atomic-design/organisms/faq/faq.component';
import { HowItWorksComponent } from './atomic-design/organisms/how-it-works/how-it-works.component';
import { CancelOptionsComponent } from './atomic-design/organisms/cancel-options/cancel-options.component';
import { ContactUsComponent } from './atomic-design/organisms/contact-us/contact-us.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [JwtCheckGuardService],
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: 'property/:propertyId',
        loadChildren: () =>
          import('../app/atomic-design/pages/sign-up/sign-up.module').then(
            (m) => m.SignUpModule
          ),
        canActivate: [PropertyGuardService],
      },
    ],
  },
  {
    path: 'register',
    component: RegisterPropertyUserComponent,
  },
  {
    path: 'login',
    component: LoginPropertyUserComponent,
  },
  {
    path: 'apartments',
    component: PropertyListComponent,
    canActivate: [PropertyListGuardService],
    runGuardsAndResolvers: 'pathParamsOrQueryParamsChange',
  },
  {
    path: 'email-confirmation',
    component: EmailVerificationComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
  },
  {
    path: 'booking',
    component: PropertyComponent,
    canActivate: [JwtCheckGuardService],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../app/atomic-design/pages/property/property.module').then(
            (m) => m.PropertyModule
          ),
      },
    ],
  },
  {
    path: 'properties/:propertyId/rooms/:roomId/booking/:bookingId',
    component: ReservationCompleteComponent,
    canActivate: [AuthenticationGuard, ReservationCompleteGuardService],
  },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'how-it-works', component: HowItWorksComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'cancel-options', component: CancelOptionsComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      relativeLinkResolution: 'legacy',
      initialNavigation: 'enabledBlocking',
      useHash: false,
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
