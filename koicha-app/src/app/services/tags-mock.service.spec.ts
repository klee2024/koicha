import { TestBed } from '@angular/core/testing';

import { TagsMockService } from './tags-mock.service';

describe('TagsMockService', () => {
  let service: TagsMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TagsMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
