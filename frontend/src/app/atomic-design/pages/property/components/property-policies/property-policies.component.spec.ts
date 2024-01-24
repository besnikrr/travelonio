import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyPoliciesComponent } from './property-policies.component';

describe('PropertyPoliciesComponent', () => {
  let component: PropertyPoliciesComponent;
  let fixture: ComponentFixture<PropertyPoliciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PropertyPoliciesComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyPoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
