import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpContentComponent } from './sign-up-content.component';

describe('SignUpContentComponent', () => {
  let component: SignUpContentComponent;
  let fixture: ComponentFixture<SignUpContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpContentComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
