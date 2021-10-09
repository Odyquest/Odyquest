import { TestBed } from '@angular/core/testing';

import { ChaseServicesService } from './chase-services.service';

describe('ChaseServicesService', () => {
  let service: ChaseServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChaseServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
