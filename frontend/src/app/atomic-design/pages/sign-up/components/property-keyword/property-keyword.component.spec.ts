import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyKeywordComponent } from './property-keyword.component';

describe('PropertyKeywordComponent', () => {
  let component: PropertyKeywordComponent;
  let fixture: ComponentFixture<PropertyKeywordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PropertyKeywordComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyKeywordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
