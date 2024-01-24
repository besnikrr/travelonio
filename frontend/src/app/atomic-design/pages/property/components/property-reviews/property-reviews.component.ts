import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

enum ReviewRank {
  ALL = 0,
  ONE_STAR,
  TWO_STARS,
  THREE_STARS,
  FOUR_STARS,
  FIVE_STARS,
}

@Component({
  selector: 'app-property-reviews',
  templateUrl: './property-reviews.component.html',
  styleUrls: ['./property-reviews.component.scss'],
})
export class PropertyReviewsComponent implements OnInit {
  ReviewRankEnum = ReviewRank;
  public showIcons = false;

  constructor(@Inject(PLATFORM_ID) private platformId: string) {
    this.showIcons = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {}
}
