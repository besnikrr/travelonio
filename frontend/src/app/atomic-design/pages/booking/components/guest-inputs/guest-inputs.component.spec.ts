import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestInputsComponent } from './guest-inputs.component';

describe('GuestInputsComponent', () => {
  let component: GuestInputsComponent;
  let fixture: ComponentFixture<GuestInputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuestInputsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
