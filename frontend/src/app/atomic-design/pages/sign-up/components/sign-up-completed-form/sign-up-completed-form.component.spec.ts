import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpCompletedFormComponent } from './sign-up-completed-form.component';

describe('SignUpCompletedFormComponent', () => {
  let component: SignUpCompletedFormComponent;
  let fixture: ComponentFixture<SignUpCompletedFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpCompletedFormComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpCompletedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
