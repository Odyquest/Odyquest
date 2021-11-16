import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RuntimeConfigurationService } from './runtime-configuration.service';
import { OAuthStorage } from 'angular-oauth2-oidc';

import { ChaseStorageService } from './chase-storage.service';
import { LocalStorageService } from './local-storage.service';

describe('ChaseStorageService', () => {
  let service: ChaseStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
		providers: [
			LocalStorageService,
		]
	});
    service = TestBed.inject(ChaseStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
