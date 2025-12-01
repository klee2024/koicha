import { TestBed } from '@angular/core/testing';

import { FirstTimeQuizService } from './first-time-quiz.service';

describe('FirstTimeQuizService', () => {
  let service: FirstTimeQuizService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirstTimeQuizService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
