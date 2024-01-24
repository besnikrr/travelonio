import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsPricesComponent } from './rooms-prices.component';

describe('RoomsProcesComponent', () => {
  let component: RoomsPricesComponent;
  let fixture: ComponentFixture<RoomsPricesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomsPricesComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomsPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
