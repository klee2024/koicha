import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewProductSliderComponent } from './review-product-slider.component';

describe('ReviewProductSliderComponent', () => {
  let component: ReviewProductSliderComponent;
  let fixture: ComponentFixture<ReviewProductSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewProductSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewProductSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
