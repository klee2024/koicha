import { TestBed } from '@angular/core/testing';

import { ReviewPreferenceService } from './review.service';

describe('ReviewsService', () => {
  let service: ReviewPreferenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewPreferenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
