import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleLineFieldComponent } from './single-line-field.component';

describe('SingleLineFieldComponent', () => {
  let component: SingleLineFieldComponent;
  let fixture: ComponentFixture<SingleLineFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingleLineFieldComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleLineFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
