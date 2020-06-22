import { TestBed } from '@angular/core/testing';

import { UtitlityService } from './utitlity.service';

describe('UtitlityService', () => {
  let service: UtitlityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtitlityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
