import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../../shared/shared.module';
import { RegisterPropertyUserComponent } from './components/register-property-user/register-property-user.component';
import { RezeMaterialModule } from '../../../material/material.module';
import { LoginPropertyUserComponent } from './components/login-property-user/login-property-user.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

@NgModule({
  declarations: [RegisterPropertyUserComponent, LoginPropertyUserComponent, EmailVerificationComponent, ForgotPasswordComponent, ChangePasswordComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    RezeMaterialModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: []
})
export class PropertyUserModule {
}
