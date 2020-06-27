import { TestBed } from '@angular/core/testing';

import { FfrDesignService } from './ffr-design.service';

describe('FfrDesignService', () => {
  let service: FfrDesignService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FfrDesignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
