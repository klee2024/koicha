import { TestBed } from '@angular/core/testing';

import { BookmarksMockService } from './bookmarks-mock.service';

describe('BookmarksMockService', () => {
  let service: BookmarksMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookmarksMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
