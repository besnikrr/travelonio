import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-quantity',
  templateUrl: './quantity.component.html',
  styleUrls: ['./quantity.component.scss']
})
export class QuantityComponent implements OnInit {
  @Input() elementId: string;
  @Input() public quantity = 0;
  @Input() showIcon = false;

  @Output() newQuantity = new EventEmitter<{
    elementId: string | undefined;
    newQuantity: number;
  }>();

  constructor() {
  }

  ngOnInit(): void {
  }

  increaseElementNumber(elementId: string): void {
    this.newQuantity.emit({ elementId, newQuantity: this.quantity + 1 });
  }

  decreaseQuantityNumber(elementId: string): void {
    if (this.quantity > 0) {
      this.newQuantity.emit({ elementId, newQuantity: this.quantity - 1 });
    }
  }
}
