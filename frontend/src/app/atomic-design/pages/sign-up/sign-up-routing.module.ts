import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { EditPropertyComponent } from './components/edit-property/edit-property.component';
import { StepValidationGuardService } from '../../../guards/step-validation-guard.service';

const routes: Routes = [
  {
    path: 'steps/:stepId',
    component: EditPropertyComponent,
    canActivate: [StepValidationGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignUpRoutingModule {}
