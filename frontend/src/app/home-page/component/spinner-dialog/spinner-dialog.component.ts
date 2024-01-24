import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { combineLatest, Subscription } from 'rxjs';
import { getPublicPropertyRequest } from 'src/app/ngrx/actions/properties.actions';
import { Property } from 'src/app/ngrx/reducers/properties.reducers';
import { Room } from 'src/app/ngrx/reducers/rooms.reducers';
import { publicPropertySelector } from 'src/app/ngrx/selectors/properties.selectors';
import { environment } from 'src/environments/environment';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-spinner-dialog',
  templateUrl: './spinner-dialog.component.html',
  styleUrls: ['./spinner-dialog.component.scss'],
})
export class SpinnerDialogComponent {
  public baseUrl = environment.baseUrl;
  public property: Property;
  public room: Room;
  private subscription = new Subscription();
  currentLanguage: string = 'EN';
  jokes: string[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: string,
    @Inject(MAT_DIALOG_DATA) public data: { randomNumber: number },
    private store: Store,
    private router: Router,
    public dialogRef: MatDialogRef<SpinnerDialogComponent>
  ) {
    if (this.data.randomNumber === 1) {
      isPlatformBrowser(platformId);
      {
        this.subscription.add(
          combineLatest([
            this.store.pipe(select(publicPropertySelector)),
          ]).subscribe(([property]) => {
            if (property) {
              this.property = property;
              this.room = property.rooms[0];
            }
          })
        );
      }
      return;
    }
    if (isPlatformBrowser(this.platformId)) {
      this.currentLanguage = location.href.includes('/al') ? 'AL' : 'EN';
    }
    if (this.currentLanguage === 'EN') {
      this.jokes = jokesEnglish;
    } else if (this.currentLanguage === 'AL') {
      this.jokes = jokesShqip;
    }
  }

  ngOnInit(): void {
    if (this.data.randomNumber === 1) {
      this.store.dispatch(
        getPublicPropertyRequest({ propertyId: '63f34962b10abb39208fca11' })
      );
    }
  }

  navigateToRoomBookingPage(): void {
    const currentDate = new Date();

    // One day from now
    const oneDayFromNow = new Date();
    oneDayFromNow.setDate(currentDate.getDate() + 1);

    // Four days from now
    const fourDaysFromNow = new Date();
    fourDaysFromNow.setDate(currentDate.getDate() + 4);

    const dateOneDayFromNowString = oneDayFromNow
      .toLocaleDateString('en-US')
      .split('/');
    const dateOneDayFromNow =
      dateOneDayFromNowString[2] +
      '-' +
      dateOneDayFromNowString[1] +
      '-' +
      dateOneDayFromNowString[0];

    const dateFourDaysFromNowString = fourDaysFromNow
      .toLocaleDateString('en-US')
      .split('/');
    const dateFourDaysFromNow =
      dateFourDaysFromNowString[2] +
      '-' +
      dateFourDaysFromNowString[1] +
      '-' +
      dateFourDaysFromNowString[0];

    this.router.navigate(['booking', 'property', this.property.propertyId], {
      queryParams: {
        allRooms: true,
        startDate: dateOneDayFromNow,
        endDate: dateFourDaysFromNow,
        adults: 1,
        children: 0,
        infants: 0,
      },
    });
    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

const jokesEnglish = [
  'Why does the robot go on vacation? To charge its batteries 😂',
  'You can’t buy happiness, but you can buy vacation, which is kind of the same thing 😂',
  'It’s bad manners to let vacation wait! 😂',
  'Whenever you feel sad, remember, that somewhere in the world there is a guy pulling a door that says push. 😂',
  'Yeah, working is great…but have you tried travelling? 😂',
];

const jokesShqip = [
  'Pse shkon roboti në pushime?',
  'Nuk mund të blesh lumturinë, por mund të blesh pushime, që është e njëjta gjë 😂',
  'Është mungesë kulture të lini pushimet të presin! 😂',
  'Sa herë që ndiheni keq, mbani mend, se diku në botë është dikush që tërheq një derë që thotë shtyj 😂',
  'Po, të punosh është fantastike… por a ke provuar të udhëtosh? 😂',
];
