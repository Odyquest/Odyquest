import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RuntimeConfigurationService } from './runtime-configuration.service';
import { OAuthStorage } from 'angular-oauth2-oidc';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    });
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('local storage should be supported', () => {
    expect(service.isLocalStorageSupported).toBeTruthy();
  });

  it('value should be writable', () => {
    expect(service.set('test', 'world')).toBeTruthy();
    expect(service.get('test')).toEqual('world');
  });

  it('value should be removable', () => {
    expect(service.set('test', 'world')).toBeTruthy();
    expect(service.remove('test')).toBeTruthy();
    expect(service.get('test')).toBe(null);
  });
});
