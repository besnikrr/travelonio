import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationImageContainerComponent } from './destination-image-container.component';

describe('DestinationImageContainerComponent', () => {
  let component: DestinationImageContainerComponent;
  let fixture: ComponentFixture<DestinationImageContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DestinationImageContainerComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DestinationImageContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
