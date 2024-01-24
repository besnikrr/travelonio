import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertRoomFormComponent } from './insert-room-form.component';

describe('InsertRoomFormComponent', () => {
  let component: InsertRoomFormComponent;
  let fixture: ComponentFixture<InsertRoomFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InsertRoomFormComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertRoomFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
