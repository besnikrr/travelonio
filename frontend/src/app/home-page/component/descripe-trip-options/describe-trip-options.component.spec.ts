import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescribeTripOptionsComponent } from './describe-trip-options.component';

describe('DescripeTripOptionsComponent', () => {
  let component: DescribeTripOptionsComponent;
  let fixture: ComponentFixture<DescribeTripOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DescribeTripOptionsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DescribeTripOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
