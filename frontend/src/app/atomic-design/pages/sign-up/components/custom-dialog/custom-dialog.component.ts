import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  title: string;
  content?: string;
  template?: string;
  footerButtonName?: string;
  secondFooterButtonName?: string;
  info?: string;
}

@Component({
  selector: 'app-custom-dialog',
  templateUrl: './custom-dialog.component.html',
  styleUrls: ['./custom-dialog.component.scss'],
})
export class CustomDialogComponent {
  @Output() onButtonClicked = new EventEmitter<void>();
  @Output() onSecondButtonClicked = new EventEmitter<void>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
