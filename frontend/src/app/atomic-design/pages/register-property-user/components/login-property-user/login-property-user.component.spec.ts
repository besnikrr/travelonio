import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPropertyUserComponent } from './login-property-user.component';

describe('LoginPropertyUserComponent', () => {
  let component: LoginPropertyUserComponent;
  let fixture: ComponentFixture<LoginPropertyUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPropertyUserComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPropertyUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
