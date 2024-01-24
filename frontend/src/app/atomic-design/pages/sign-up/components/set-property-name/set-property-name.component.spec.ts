import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetPropertyNameComponent } from './set-property-name.component';

describe('SetPropertyNameComponent', () => {
  let component: SetPropertyNameComponent;
  let fixture: ComponentFixture<SetPropertyNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SetPropertyNameComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetPropertyNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
