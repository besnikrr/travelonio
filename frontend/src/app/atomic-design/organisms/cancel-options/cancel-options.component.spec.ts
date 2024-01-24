import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelOptionsComponent } from './cancel-options.component';

describe('CancelOptionsComponent', () => {
  let component: CancelOptionsComponent;
  let fixture: ComponentFixture<CancelOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
