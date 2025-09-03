import { TestBed } from '@angular/core/testing';

import { PreparationsMockService } from './preparations-mock.service';

describe('PreparationsMockService', () => {
  let service: PreparationsMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreparationsMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
