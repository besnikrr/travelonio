import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialPictureComponent } from './testimonial-picture.component';

describe('TestimonialPictureComponent', () => {
  let component: TestimonialPictureComponent;
  let fixture: ComponentFixture<TestimonialPictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestimonialPictureComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestimonialPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
