import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewCardExpandedComponent } from './review-card-expanded.component';

describe('ReviewCardExpandedComponent', () => {
  let component: ReviewCardExpandedComponent;
  let fixture: ComponentFixture<ReviewCardExpandedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewCardExpandedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewCardExpandedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
