import { TestBed } from '@angular/core/testing';

import { UserProductsService } from './user-products.service';

describe('UserProductsService', () => {
  let service: UserProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
