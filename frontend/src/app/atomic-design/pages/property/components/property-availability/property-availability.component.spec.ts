import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyAvailabilityComponent } from './property-availability.component';

describe('PropertyAvailabilityComponent', () => {
  let component: PropertyAvailabilityComponent;
  let fixture: ComponentFixture<PropertyAvailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PropertyAvailabilityComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
