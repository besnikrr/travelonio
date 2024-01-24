import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchLocationFieldComponent } from './search-location-field.component';

describe('SearchLocationFieldComponent', () => {
  let component: SearchLocationFieldComponent;
  let fixture: ComponentFixture<SearchLocationFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchLocationFieldComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchLocationFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
