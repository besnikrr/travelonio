import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacesDisplayCardComponent } from './places-display-card.component';

describe('PlacesDisplayCardComponent', () => {
  let component: PlacesDisplayCardComponent;
  let fixture: ComponentFixture<PlacesDisplayCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlacesDisplayCardComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacesDisplayCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
