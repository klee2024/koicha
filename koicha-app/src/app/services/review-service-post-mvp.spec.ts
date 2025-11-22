import { TestBed } from '@angular/core/testing';

import { ReviewRankingService } from './review-ranking.service';

describe('ReviewRankingService', () => {
  let service: ReviewRankingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewRankingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
