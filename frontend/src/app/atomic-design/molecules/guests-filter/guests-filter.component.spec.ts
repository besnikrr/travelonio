import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestsFilterComponent } from './guests-filter.component';

describe('GuestsFilterComponent', () => {
  let component: GuestsFilterComponent;
  let fixture: ComponentFixture<GuestsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GuestsFilterComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
