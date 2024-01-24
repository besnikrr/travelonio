import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpStepDescriptionComponent } from './sign-up-step-description.component';

describe('SignUpStepDescriptionComponent', () => {
  let component: SignUpStepDescriptionComponent;
  let fixture: ComponentFixture<SignUpStepDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpStepDescriptionComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpStepDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
