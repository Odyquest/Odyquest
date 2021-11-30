import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OAuthStorage } from 'angular-oauth2-oidc';

import { RuntimeConfigurationService } from './runtime-configuration.service';

describe('RuntimeConfigurationService', () => {
  let service: RuntimeConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
		imports: [
			HttpClientTestingModule,
		],
	});
    service = TestBed.inject(RuntimeConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
