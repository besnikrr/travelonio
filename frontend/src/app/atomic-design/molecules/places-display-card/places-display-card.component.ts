import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PlaceInfoData } from '../../../test-data';

@Component({
  selector: 'app-places-display-card',
  templateUrl: './places-display-card.component.html',
  styleUrls: ['./places-display-card.component.scss']
})
export class PlacesDisplayCardComponent implements OnInit {
  @Input() placeData: PlaceInfoData;
  @Output() onClick = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit(): void {
  }
}
