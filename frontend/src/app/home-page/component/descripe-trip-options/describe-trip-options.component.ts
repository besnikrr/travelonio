import { Component, EventEmitter, Inject, Input, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-describe-trip-options',
  templateUrl: './describe-trip-options.component.html',
  styleUrls: ['./describe-trip-options.component.scss']
})
export class DescribeTripOptionsComponent implements OnInit {
  @Input() icon: string;
  @Input() tripOption: string;
  @Input() tripId: number;
  @Input() selectedTripOption: number;
  @Output() select = new EventEmitter<number>();
  public showIcons = false;

  constructor(@Inject(PLATFORM_ID) private platformId: string) {
    this.showIcons = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
  }

  clickEvent(): void {
    this.select.emit(this.tripId);
  }

}
