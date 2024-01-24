import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBillCardComponent } from './user-bill-card.component';

describe('UserBillCardComponent', () => {
  let component: UserBillCardComponent;
  let fixture: ComponentFixture<UserBillCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserBillCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBillCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
