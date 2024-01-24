import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomDialogComponent } from '../custom-dialog/custom-dialog.component';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
  dirtyInputs,
  propertyDescription,
  propertyId,
} from '../../../../../ngrx/selectors/properties.selectors';
import { updatePropertyRequest } from '../../../../../ngrx/actions/properties.actions';

@Component({
  selector: 'app-describe-property',
  templateUrl: './describe-property.component.html',
  styleUrls: ['./describe-property.component.scss'],
})
export class DescribePropertyComponent {
  public description: string | undefined;
  public propertyId: string | undefined;
  public dirtyInputs = this.store.pipe(select(dirtyInputs));

  @ViewChild('desc') desc: ElementRef;
  public subscription = new Subscription();

  constructor(public dialog: MatDialog, private store: Store) {
    this.subscription.add(
      this.store.pipe(select(propertyDescription)).subscribe((p) => {
        if (p) {
          this.description = p;
        }
      })
    );

    this.subscription.add(
      this.store.pipe(select(propertyId)).subscribe((id) => {
        this.propertyId = id;
      })
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CustomDialogComponent, {
      width: '639.72px',
      panelClass: 'custom-dialog',
      data: {
        title: $localize`:How to write your property Description@@howToWritePropertyDesc:How to write your property Description`,
        content: $localize`:how to write property description dialog content@@descDialogContent:In order for visitors to get acquainted with your property, you need to write a description in which you need to describe your property in detail, in the most realistic and correct way with what is in reality.
          In this description it is important to describe the type of your property, what conditions and services it offers, and to indicate for which age group your property is most suitable. Also, try to answer the question of why visitors should make reservations about you by showing what is special in and around your property. You need to keep in mind that the description should be clear, concise, current and as engaging as possible to potential visitors.`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  update(): void {
    if (this.description !== this.desc.nativeElement.value) {
      this.store.dispatch(
        updatePropertyRequest({
          propertyId: this.propertyId,
          data: {
            description:
              this.desc.nativeElement.value === ''
                ? ' '
                : this.desc.nativeElement.value,
          },
        })
      );
    }
  }
}
