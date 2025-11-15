import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReviewCardComponent } from './create-review-card.component';

describe('CreateReviewCardComponent', () => {
  let component: CreateReviewCardComponent;
  let fixture: ComponentFixture<CreateReviewCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateReviewCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateReviewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
