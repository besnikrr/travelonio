import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { setOpenWelcomeModal } from '../../../ngrx/actions/settings.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-dialog',
  templateUrl: './welcome-dialog.component.html',
  styleUrls: ['./welcome-dialog.component.scss'],
})
export class WelcomeDialogComponent {
  constructor(private store: Store, private router: Router) {}

  public startExploring(): void {
    this.router.navigate(['home']);
    this.store.dispatch(setOpenWelcomeModal({ openModal: false }));
  }
}
