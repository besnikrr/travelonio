import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SpinnerDialogComponent } from '../spinner-dialog/spinner-dialog.component';
@Component({
  selector: 'app-roulette',
  templateUrl: './roulette.component.html',
  styleUrls: ['./roulette.component.scss'],
})
export class RouletteComponent implements OnInit {
  @ViewChild('container') container: ElementRef;
  number = Math.ceil(Math.random() * 15000);
  isButtonDisabled = false;

  constructor(public dialog: MatDialog) {
    // Check local storage on component initialization
    const disableUntil = localStorage.getItem('disableUntil');
    if (disableUntil) {
      const currentTime = new Date().getTime(); // Get current time in milliseconds
      if (currentTime < parseInt(disableUntil, 10)) {
        this.isButtonDisabled = true; // Disable the button if disableUntil timestamp is still in the future
      } else {
        localStorage.removeItem('disableUntil'); // Remove the disableUntil timestamp from local storage if it has expired
      }
    }
  }

  ngOnInit(): void {}

  handleButtonClick() {}

  spin() {
    return new Promise<void>((resolve) => {
      this.container.nativeElement.style.transform =
        'rotate(' + this.number + 'deg)';
      this.number += Math.ceil(Math.random() * 5000);
      // Handle button click
      this.isButtonDisabled = true; // Disable the button
      const currentTime = new Date().getTime(); // Get current time in milliseconds
      // const disableUntil = currentTime + 24 * 60 * 60 * 1000; // Add 24 hours in milliseconds
      const disableUntil = currentTime + 15 * 1000; // 10 seconds for now in order to test it better
      localStorage.setItem('disableUntil', disableUntil.toString()); // Persist the disableUntil timestamp in local storage
      resolve();
    });
  }

  onSpinComplete() {
    this.spin()?.then(() => {
      setTimeout(() => {
        const randomNumber = Math.floor(Math.random() * 5) + 1; // Generate random number from 1-5
        this.dialog.open(SpinnerDialogComponent, {
          data: { randomNumber },
        });
      }, 5200);
    });
  }
}
