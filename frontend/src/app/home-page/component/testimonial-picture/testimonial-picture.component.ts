import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-testimonial-picture',
  templateUrl: './testimonial-picture.component.html',
  styleUrls: ['./testimonial-picture.component.scss']
})
export class TestimonialPictureComponent implements OnInit {
  @Input() image: string;
  @Input() testimonial: string | undefined;
  public showIcons = false;

  constructor(@Inject(PLATFORM_ID) private platformId: string) {
    this.showIcons = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
  }
}
