import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizedGoogleMapComponent } from './customized-google-map.component';

describe('CustomizedGoogleMapComponent', () => {
  let component: CustomizedGoogleMapComponent;
  let fixture: ComponentFixture<CustomizedGoogleMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomizedGoogleMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomizedGoogleMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
