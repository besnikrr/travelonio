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
import { Property } from '../../../../../ngrx/reducers/properties.reducers';
import { CustomDialogComponent } from '../custom-dialog/custom-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarService } from '../../../../../ngrx/services/snackbar.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { setProperty } from '../../../../../ngrx/actions/properties.actions';
import { setRooms } from '../../../../../ngrx/actions/rooms.actions';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-property-selection',
  templateUrl: './property-selection.component.html',
  styleUrls: ['./property-selection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PropertySelectionComponent implements OnInit {
  @Input() properties: Property[] | undefined;
  @Output() createPropertyEmitter = new EventEmitter<void>();
  @Output() selectPropertyEmitter = new EventEmitter<string>();
  @Output() deletePropertyEmitter = new EventEmitter<string>();

  public showDeleteIcon: string | undefined = undefined;
  currentLanguage = 'EN';

  constructor(
    public dialog: MatDialog,
    private snackBar: SnackBarService,
    private router: Router,
    private store: Store,
    @Inject(PLATFORM_ID) private platformId: string
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.currentLanguage = location.href.includes('/al') ? 'AL' : 'EN';
    }
  }

  ngOnInit(): void {}

  createProperty(): void {
    this.createPropertyEmitter.emit();
  }

  selectProperty(propertyId: string): void {
    this.selectPropertyEmitter.emit(propertyId);
    this.store.dispatch(setProperty({ property: undefined }));
    this.store.dispatch(setRooms({ rooms: [] }));
    this.router
      .navigate(['/sign-up/property/' + propertyId + '/steps/1'])
      .then(() => {
        location.reload();
      });
  }

  deleteProperty($event: { propertyId: string; propertyName: string }): void {
    const dialogRef = this.dialog.open(CustomDialogComponent, {
      width: '639.72px',
      panelClass: 'custom-dialog',
      data: {
        title:
          this.currentLanguage === 'EN' ? 'Delete property' : 'Fshi pronën',
        content:
          (this.currentLanguage === 'EN'
            ? 'Are you sure you want to delete property: "'
            : 'Jeni të sigurt që dëshironi të fshini pronën: "') +
          ($event.propertyName !== '' && $event.propertyName !== undefined
            ? $event.propertyName
            : 'Property Name') +
          '" ?',
        footerButtonName: this.currentLanguage === 'EN' ? 'DELETE' : 'FSHIJE',
      },
    });

    dialogRef.componentInstance.onButtonClicked.subscribe(() => {
      this.deletePropertyEmitter.emit($event.propertyId);
      dialogRef.close();
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  copyAlert(): void {
    this.snackBar.openSnackBar('Copied to clipboard');
  }

  formatDate(updatedAt: string): string {
    const date = new Date(updatedAt);
    return (
      date.getDate() +
      '.' +
      (date.getMonth() + 1) +
      '.' +
      date.getFullYear() +
      ' ' +
      date.getHours() +
      ':' +
      date.getMinutes()
    );
  }
}
