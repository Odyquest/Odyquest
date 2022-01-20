import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RuntimeConfigurationService } from './runtime-configuration.service';
import { OAuthStorage } from 'angular-oauth2-oidc';

import { ChaseStatus } from 'chase-model';
import { getSimpleExample } from 'chase-model';

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

  /* Running Chase */
  it('running chase should be write- and readable', () => {
    service.setRunningChase(getSimpleExample());
    expect(service.hasRunningChase()).toBeTruthy();
    expect(service.getRunningChase().metaData.title).toBe(getSimpleExample().metaData.title);
  });

  it('running chase should be removeable', () => {
    service.setRunningChase(getSimpleExample());
    expect(service.hasRunningChase()).toBeTruthy();
    expect(service.deleteRunningChase()).toBeTruthy();
    expect(service.hasRunningChase()).toBeFalsy();
  });

  /* Current Position */
  it('current position should be write- and readable', () => {
    service.setCurrentPosition(75);
    expect(service.getCurrentPosition()).toBe(75);
  });

  it('current position should be removeable', () => {
    service.setCurrentPosition(42);
    expect(service.getCurrentPosition()).toBe(42);
    expect(service.deleteCurrentPosition()).toBeTruthy();
    expect(service.getCurrentPosition()).toBe(null);
  });

  /* Chase Status */
  it('chase status list should be write- and readable', () => {
    service.setChaseStatus('test_chase', ChaseStatus.Started);
    expect(service.getChaseStatus('test_chase')).toBe(ChaseStatus.Started);
  });
});
