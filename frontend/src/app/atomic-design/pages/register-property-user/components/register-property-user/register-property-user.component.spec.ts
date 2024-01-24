import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPropertyUserComponent } from './register-property-user.component';

describe('RegisterPropertyUserComponent', () => {
  let component: RegisterPropertyUserComponent;
  let fixture: ComponentFixture<RegisterPropertyUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterPropertyUserComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPropertyUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
