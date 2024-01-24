import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakfastAndLanguageFormComponent } from './breakfast-and-language-form.component';

describe('BreakfastAndLanguageFormComponent', () => {
  let component: BreakfastAndLanguageFormComponent;
  let fixture: ComponentFixture<BreakfastAndLanguageFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BreakfastAndLanguageFormComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreakfastAndLanguageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
