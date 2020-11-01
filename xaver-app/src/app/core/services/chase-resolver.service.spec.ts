import { TestBed } from '@angular/core/testing';

import { ChaseResolverService } from './chase-resolver.service';

describe('ChaseResolverService', () => {
  let service: ChaseResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChaseResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
