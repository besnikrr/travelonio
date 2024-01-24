import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-carousel-item',
  templateUrl: './carousel-item.component.html',
  styleUrls: ['./carousel-item.component.scss'],
})
export class CarouselItemComponent implements OnInit {
  @Input() data: { image: string; price: number; place: string };
  @Input() width: number;
  public showIcons = false;

  constructor(@Inject(PLATFORM_ID) private platformId: string) {
    this.showIcons = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {}
}
