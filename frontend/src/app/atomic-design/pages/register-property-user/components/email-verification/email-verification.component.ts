import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyUsersService } from '../../../../../ngrx/services/property-user-service';
import { SnackBarService } from '../../../../../ngrx/services/snackbar.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit {
  private link: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private us: PropertyUsersService,
    private snack: SnackBarService
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.link = params.link;
      if (this.link) {
        this.us.confirmEmail(this.link).subscribe();
        this.snack.openSnackBar('Your email is confirmed, thank you!');
        this.router.navigate(['/home']);
      }
    });
  }
}
