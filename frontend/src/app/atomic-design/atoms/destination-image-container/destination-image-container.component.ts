import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-destination-image-container',
  templateUrl: './destination-image-container.component.html',
  styleUrls: ['./destination-image-container.component.scss']
})
export class DestinationImageContainerComponent {
  @Input() name: string;
  @Input() size: { width: number; height: number };
  @Input() url: string;

  constructor() {
  }
}
