import { TestBed } from '@angular/core/testing';

import { ChaseService } from './chase.service';

describe('ChaseService', () => {
  let service: ChaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
