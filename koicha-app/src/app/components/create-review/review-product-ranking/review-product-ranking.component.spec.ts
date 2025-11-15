import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewProductRankingComponent } from './review-product-ranking.component';

describe('ReviewProductRankingComponent', () => {
  let component: ReviewProductRankingComponent;
  let fixture: ComponentFixture<ReviewProductRankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewProductRankingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewProductRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
