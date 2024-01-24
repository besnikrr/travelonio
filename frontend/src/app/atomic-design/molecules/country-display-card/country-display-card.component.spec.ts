import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryDisplayCardComponent } from './country-display-card.component';

describe('CountryDisplayCardComponent', () => {
  let component: CountryDisplayCardComponent;
  let fixture: ComponentFixture<CountryDisplayCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CountryDisplayCardComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryDisplayCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
