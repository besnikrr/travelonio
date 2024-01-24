import { Component, Input, OnInit } from '@angular/core';
import { InfoBoxData } from '../../../test-data';

@Component({
  selector: 'app-info-box',
  templateUrl: './info-box.component.html',
  styleUrls: ['./info-box.component.scss']
})
export class InfoBoxComponent implements OnInit {
  @Input() infoData: InfoBoxData;

  constructor() {
  }

  ngOnInit(): void {
  }
}
