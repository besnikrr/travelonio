import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BedTypeInfoComponent } from './bed-type-info.component';

describe('BedTypeInfoComponent', () => {
  let component: BedTypeInfoComponent;
  let fixture: ComponentFixture<BedTypeInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BedTypeInfoComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BedTypeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
