import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OAuthStorage } from 'angular-oauth2-oidc';

import { ChaseService } from './chase.service';
import { RuntimeConfigurationService } from './runtime-configuration.service';

describe('ChaseService', () => {
  let service: ChaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
		imports: [
			HttpClientTestingModule,
		],
		providers: [
			RuntimeConfigurationService,
			OAuthStorage
		]
	});
    service = TestBed.inject(ChaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
