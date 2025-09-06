import { TestBed } from '@angular/core/testing';

import { TasteProfileService } from './taste-profile.service';

describe('TasteProfileService', () => {
  let service: TasteProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasteProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
